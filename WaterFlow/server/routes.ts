import type { Express } from "express";
import { createServer, type Server } from "http";
import fs from 'fs/promises';
import path from 'path';
import { getWaterUsageData, appendWaterUsageData } from "./waterService";

export async function registerRoutes(app: Express): Promise<Server> {
  // Create water usage file if it doesn't exist
  try {
    await fs.access('./values.txt');
  } catch (error) {
    // Generate some initial data
    await fs.writeFile('./values.txt', '72.5\n75.3\n78.1\n76.4\n74.9\n73.2\n77.8\n79.4\n76.1\n75.0');
  }

  // Get water usage data
  app.get('/api/water-usage', async (req, res) => {
    try {
      const data = await getWaterUsageData();
      res.json(data);
    } catch (error) {
      console.error('Error reading water usage data:', error);
      res.status(500).json({ message: 'Failed to read water usage data' });
    }
  });

  // Add a simulated data point (for development/testing only)
  app.post('/api/water-usage/simulate', async (req, res) => {
    try {
      // Generate a random value between 1-6
      const newValue = Math.round((Math.random() * 5 + 1) * 10) / 10;
      
      // Randomly choose location
      const locations = ['B', 'K', 'L', 'O'];
      const randomLocation = locations[Math.floor(Math.random() * locations.length)];
      
      await appendWaterUsageData(newValue, randomLocation);
      res.json({ success: true, location: randomLocation, value: newValue });
    } catch (error) {
      console.error('Error simulating water usage data:', error);
      res.status(500).json({ message: 'Failed to simulate water usage data' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
