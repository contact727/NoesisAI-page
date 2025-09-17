import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import fs from "fs/promises";
import path from "path";
import { createNocoDBService } from "./services/nocodb";
import { createGoogleSheetsService } from "./services/googlesheets";

// Lead form validation schema
const leadSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().optional(),
  email: z.string().email(),
  company: z.string().optional(),
  consent: z.boolean().refine(val => val === true),
  source: z.string(),
  path: z.string(),
  timestamp: z.string(),
});

type Lead = z.infer<typeof leadSchema>;

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize external services
  const nocoDBService = createNocoDBService();
  const googleSheetsService = createGoogleSheetsService();
  
  // API route for lead submission (Enhanced with multiple storage options)
  app.post('/api/lead', async (req, res) => {
    try {
      // Validate request body
      const validatedData = leadSchema.parse(req.body);
      
      // Ensure data directory exists
      const dataDir = path.join(process.cwd(), 'data');
      await fs.mkdir(dataDir, { recursive: true });
      
      const leadData = {
        ...validatedData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      
      const results = [];
      
      // Try to save to external services first (NocoDB, Google Sheets)
      if (nocoDBService) {
        try {
          const nocoResult = await nocoDBService.createLead(leadData);
          results.push({ service: 'NocoDB', success: true, id: nocoResult.Id });
        } catch (error) {
          console.error('NocoDB save failed:', error);
          results.push({ service: 'NocoDB', success: false, error: error instanceof Error ? error.message : 'Unknown error' });
        }
      }
      
      if (googleSheetsService) {
        try {
          const sheetsResult = await googleSheetsService.createLead(leadData);
          results.push({ service: 'Google Sheets', success: true, range: sheetsResult.updates?.updatedRange });
        } catch (error) {
          console.error('Google Sheets save failed:', error);
          results.push({ service: 'Google Sheets', success: false, error: error instanceof Error ? error.message : 'Unknown error' });
        }
      }
      
      // Always save to local file as backup
      try {
        const dataDir = path.join(process.cwd(), 'data');
        await fs.mkdir(dataDir, { recursive: true });
        
        const leadsFile = path.join(dataDir, 'leads.json');
        let leads: any[] = [];
        
        try {
          const existingData = await fs.readFile(leadsFile, 'utf-8');
          leads = JSON.parse(existingData);
        } catch (error) {
          leads = [];
        }
        
        leads.push(leadData);
        await fs.writeFile(leadsFile, JSON.stringify(leads, null, 2));
        results.push({ service: 'Local File', success: true, id: leadData.id });
      } catch (error) {
        console.error('Local file save failed:', error);
        results.push({ service: 'Local File', success: false, error: error instanceof Error ? error.message : 'Unknown error' });
      }
      
      // Log success
      console.log('Lead saved:', {
        email: leadData.email,
        name: `${leadData.firstName} ${leadData.lastName || ''}`.trim(),
        company: leadData.company,
        results: results
      });
      
      // Send success response if at least one service succeeded
      const hasSuccess = results.some(r => r.success);
      
      if (hasSuccess) {
        res.status(201).json({
          success: true,
          message: 'Lead enregistré avec succès',
          id: leadData.id,
          saved_to: results.filter(r => r.success).map(r => r.service)
        });
      } else {
        throw new Error('Aucun service de stockage n\'a réussi');
      }
      
    } catch (error) {
      console.error('Lead submission error:', error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: 'Données invalides',
          errors: error.errors,
        });
      }
      
      res.status(500).json({
        success: false,
        message: 'Erreur serveur lors de l\'enregistrement',
      });
    }
  });
  
  const httpServer = createServer(app);

  return httpServer;
}
