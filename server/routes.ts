import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import fs from "fs/promises";
import path from "path";

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
  // API route for lead submission (Option B)
  app.post('/api/lead', async (req, res) => {
    try {
      // Validate request body
      const validatedData = leadSchema.parse(req.body);
      
      // Ensure data directory exists
      const dataDir = path.join(process.cwd(), 'data');
      await fs.mkdir(dataDir, { recursive: true });
      
      // Prepare lead data with ID and timestamp
      const leadData = {
        id: Date.now().toString(),
        ...validatedData,
        createdAt: new Date().toISOString(),
      };
      
      // Read existing leads or create empty array
      const leadsFile = path.join(dataDir, 'leads.json');
      let leads: any[] = [];
      
      try {
        const existingData = await fs.readFile(leadsFile, 'utf-8');
        leads = JSON.parse(existingData);
      } catch (error) {
        // File doesn't exist yet, start with empty array
        leads = [];
      }
      
      // Append new lead
      leads.push(leadData);
      
      // Write back to file
      await fs.writeFile(leadsFile, JSON.stringify(leads, null, 2));
      
      // Log success
      console.log('Lead saved:', {
        email: leadData.email,
        name: `${leadData.firstName} ${leadData.lastName || ''}`.trim(),
        company: leadData.company,
        timestamp: leadData.timestamp,
      });
      
      // Send success response
      res.status(201).json({
        success: true,
        message: 'Lead enregistré avec succès',
        id: leadData.id,
      });
      
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
