import fs from 'fs/promises';
import path from 'path';
import { WaterData } from '@shared/schema';

// Get the last 10 water usage values
export async function getWaterUsageData(): Promise<WaterData[]> {
  try {
    const data = await fs.readFile('./values.txt', 'utf-8');
    const lines = data.trim().split('\n');
    
    // Get the last 10 lines (or all if less than 10)
    const lastTenLines = lines.slice(-10);
    
    // Convert to WaterData objects with timestamps
    // Newer values are at the end of the file, but we want them at the beginning of the array
    // for displaying in the chart with most recent first
    const result: WaterData[] = lastTenLines.map((line, index) => {
      // Calculate a timestamp that puts newer entries (higher indices) closer to now
      const timestamp = new Date(Date.now() - (lastTenLines.length - 1 - index) * 3000);
      
      // Check if line has a format like "B: 4.9" (location: value)
      const locationMatch = line.match(/^([A-Z]):\s*(\d+\.\d+|\d+)$/);
      
      if (locationMatch) {
        // Format is location: value (e.g., "B: 4.9")
        const [, location, valueStr] = locationMatch;
        const value = parseFloat(valueStr);
        
        return {
          value,
          timestamp: timestamp.toISOString(),
          location
        };
      } else {
        // Old format - just a number (e.g., "75.3")
        const value = parseFloat(line);
        
        return {
          value,
          timestamp: timestamp.toISOString()
        };
      }
    }).reverse();
    
    return result;
  } catch (error) {
    console.error('Error reading water usage data:', error);
    throw error;
  }
}

// Append a new water usage value
export async function appendWaterUsageData(value: number, location?: string): Promise<void> {
  try {
    const data = await fs.readFile('./values.txt', 'utf-8');
    const lines = data.trim().split('\n');
    
    // Add the new value, with location if provided
    const newLine = location ? `${location}: ${value}` : value.toString();
    lines.push(newLine);
    
    // Keep only the last 50 values to prevent the file from growing indefinitely
    const lastFiftyLines = lines.slice(-50);
    
    // Write back to the file
    await fs.writeFile('./values.txt', lastFiftyLines.join('\n'));
  } catch (error) {
    console.error('Error appending water usage data:', error);
    throw error;
  }
}
