interface NocoDBConfig {
  baseURL: string;
  apiToken: string;
  projectId: string;
  tableId: string;
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

export class NocoDBService {
  private config: NocoDBConfig;

  constructor(config: NocoDBConfig) {
    this.config = config;
  }

  private async makeRequest(endpoint: string, options: any = {}) {
    const url = `${this.config.baseURL}/api/v1/db/data/v1/${this.config.projectId}/${this.config.tableId}${endpoint}`;
    
    const config: RequestInit = {
      method: options.method || 'GET',
      headers: {
        'xc-token': this.config.apiToken,
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
        throw new Error(`NocoDB API Error: ${response.status} - ${errorText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('NocoDB Request failed:', error);
      throw error;
    }
  }

  async createLead(leadData: LeadData): Promise<any> {
    try {
      const payload = {
        first_name: leadData.firstName,
        last_name: leadData.lastName || '',
        email: leadData.email,
        company: leadData.company || '',
        consent: leadData.consent,
        source: leadData.source,
        path: leadData.path,
        timestamp: leadData.timestamp,
        created_at: new Date().toISOString()
      };

      const result = await this.makeRequest('', {
        method: 'POST',
        body: payload
      });

      console.log('Lead saved to NocoDB:', {
        id: result.Id,
        email: leadData.email,
        source: leadData.source
      });

      return result;
    } catch (error) {
      console.error('Failed to save lead to NocoDB:', error);
      throw new Error('Failed to save lead to database');
    }
  }

  async getLeads(params: any = {}): Promise<any> {
    try {
      const queryParams = new URLSearchParams(params).toString();
      const endpoint = queryParams ? `?${queryParams}` : '';
      
      return await this.makeRequest(endpoint);
    } catch (error) {
      console.error('Failed to fetch leads from NocoDB:', error);
      throw error;
    }
  }

  async getLeadById(id: string): Promise<any> {
    try {
      return await this.makeRequest(`/${id}`);
    } catch (error) {
      console.error('Failed to fetch lead from NocoDB:', error);
      throw error;
    }
  }
}

// Factory function to create NocoDB service
export function createNocoDBService(): NocoDBService | null {
  const baseURL = process.env.NOCODB_BASE_URL;
  const apiToken = process.env.NOCODB_API_TOKEN;
  const projectId = process.env.NOCODB_PROJECT_ID;
  const tableId = process.env.NOCODB_TABLE_ID || 'Leads'; // Default table name

  if (!baseURL || !apiToken || !projectId) {
    console.log('NocoDB configuration missing. Add NOCODB_BASE_URL, NOCODB_API_TOKEN, and NOCODB_PROJECT_ID to environment variables.');
    return null;
  }

  return new NocoDBService({
    baseURL,
    apiToken,
    projectId,
    tableId
  });
}