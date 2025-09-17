import { JWT } from 'google-auth-library';

interface GoogleSheetsConfig {
  serviceAccountEmail: string;
  privateKey: string;
  spreadsheetId: string;
  sheetName?: string;
}

interface LeadData {
  firstName: string;
  lastName?: string;
  email: string;
  company?: string;
  consent: boolean;
  source: string;
  path: string;
  timestamp: string;
}

export class GoogleSheetsService {
  private config: GoogleSheetsConfig;
  private jwtClient: JWT;

  constructor(config: GoogleSheetsConfig) {
    this.config = config;
    this.jwtClient = new JWT({
      email: config.serviceAccountEmail,
      key: config.privateKey.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });
  }

  private async getAccessToken(): Promise<string> {
    try {
      await this.jwtClient.authorize();
      return this.jwtClient.credentials.access_token!;
    } catch (error) {
      console.error('Failed to get Google Sheets access token:', error);
      throw new Error('Google Sheets authentication failed');
    }
  }

  private async makeRequest(endpoint: string, options: any = {}) {
    const accessToken = await this.getAccessToken();
    
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.config.spreadsheetId}${endpoint}`;
    
    const config: RequestInit = {
      method: options.method || 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        ...options.headers
      }
    };

    if (options.body) {
      config.body = JSON.stringify(options.body);
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Google Sheets API Error: ${response.status} - ${errorText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Google Sheets Request failed:', error);
      throw error;
    }
  }

  async createLead(leadData: LeadData): Promise<any> {
    try {
      const sheetName = this.config.sheetName || 'Leads';
      
      // Prepare row data
      const rowData = [
        new Date().toISOString(), // Created At
        leadData.firstName,
        leadData.lastName || '',
        leadData.email,
        leadData.company || '',
        leadData.consent ? 'Oui' : 'Non',
        leadData.source,
        leadData.path,
        leadData.timestamp
      ];

      // Append row to sheet
      const result = await this.makeRequest(`/values/${sheetName}:append`, {
        method: 'POST',
        body: {
          values: [rowData],
          valueInputOption: 'RAW'
        }
      });

      console.log('Lead saved to Google Sheets:', {
        spreadsheetId: this.config.spreadsheetId,
        email: leadData.email,
        source: leadData.source,
        updatedRange: result.updates?.updatedRange
      });

      return result;
    } catch (error) {
      console.error('Failed to save lead to Google Sheets:', error);
      throw new Error('Failed to save lead to spreadsheet');
    }
  }

  async getLeads(): Promise<any> {
    try {
      const sheetName = this.config.sheetName || 'Leads';
      const range = `${sheetName}!A:I`; // Adjust range based on your columns
      
      const result = await this.makeRequest(`/values/${range}`);
      
      return {
        values: result.values || [],
        range: result.range
      };
    } catch (error) {
      console.error('Failed to fetch leads from Google Sheets:', error);
      throw error;
    }
  }

  async initializeSheet(): Promise<any> {
    try {
      const sheetName = this.config.sheetName || 'Leads';
      
      // Create headers row if sheet is empty
      const headers = [
        'Created At',
        'First Name', 
        'Last Name',
        'Email',
        'Company',
        'Consent',
        'Source',
        'Path',
        'Timestamp'
      ];

      // Check if sheet exists and has headers
      try {
        const existingData = await this.getLeads();
        if (existingData.values && existingData.values.length > 0) {
          console.log('Google Sheets already initialized');
          return existingData;
        }
      } catch (error) {
        // Sheet might not exist, we'll create headers
      }

      // Add headers
      const result = await this.makeRequest(`/values/${sheetName}:append`, {
        method: 'POST',
        body: {
          values: [headers],
          valueInputOption: 'RAW'
        }
      });

      console.log('Google Sheets initialized with headers');
      return result;
    } catch (error) {
      console.error('Failed to initialize Google Sheets:', error);
      throw error;
    }
  }
}

// Factory function to create Google Sheets service
export function createGoogleSheetsService(): GoogleSheetsService | null {
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;
  const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;
  const sheetName = process.env.GOOGLE_SHEET_NAME || 'Leads';

  if (!serviceAccountEmail || !privateKey || !spreadsheetId) {
    console.log('Google Sheets configuration missing. Add GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY, and GOOGLE_SPREADSHEET_ID to environment variables.');
    return null;
  }

  return new GoogleSheetsService({
    serviceAccountEmail,
    privateKey,
    spreadsheetId,
    sheetName
  });
}