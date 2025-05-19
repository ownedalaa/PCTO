import fs from 'fs/promises';
import path from 'path';
import { WaterData } from '@shared/schema';

// Get the last 10 water usage values
export async function getWaterUsageData(): Promise<WaterData[]> {
  try {
    // Make file path compatible with different OS
    const filePath = path.resolve('.', 'values.txt');
    console.log('Reading from file path:', filePath);
    
    let data;
    try {
      data = await fs.readFile(filePath, 'utf-8');
    } catch (err) {
      console.error(`Error reading ${filePath}:`, err);
      // Try an alternate path
      const altPath = path.resolve(process.cwd(), 'values.txt');
      console.log('Trying alternate path:', altPath);
      data = await fs.readFile(altPath, 'utf-8');
    }
    
    const lines = data.trim().split('\n');
    console.log('Read lines from file:', lines);
    
    // Get the last 10 lines (or all if less than 10)
    const lastTenLines = lines.slice(-10);
    
    // Convert to WaterData objects with timestamps
    // Newer values are at the end of the file, but we want them at the beginning of the array
    // for displaying in the chart with most recent first
    const result: WaterData[] = lastTenLines.map((line, index) => {
      // Log the line being processed
      console.log(`Processing line ${index}:`, line);
      
      // Calculate a timestamp that puts newer entries (higher indices) closer to now
      const timestamp = new Date(Date.now() - (lastTenLines.length - 1 - index) * 3000);
      
      // Use a more flexible regex that can handle different formats and spacing
      // Check if line has a format like "B: 4.9" or "B:4.9" (location: value)
      // Also handle potential whitespace issues
      const locationMatch = line.trim().match(/^([A-Z]):?\s*(\d+\.?\d*)$/);
      
      if (locationMatch) {
        // Format is location: value (e.g., "B: 4.9")
        const [, location, valueStr] = locationMatch;
        const value = parseFloat(valueStr);
        
        console.log(`Matched location format: location=${location}, value=${value}`);
        
        return {
          value,
          timestamp: timestamp.toISOString(),
          location
        };
      } else {
        // Try to parse as a simple number
        const value = parseFloat(line);
        
        if (!isNaN(value)) {
          console.log(`Parsed as numeric value: ${value}`);
          return {
            value,
            timestamp: timestamp.toISOString()
          };
        } else {
          console.log(`Failed to parse line: "${line}"`);
          return {
            value: null,
            timestamp: timestamp.toISOString()
          };
        }
      }
    }).reverse();
    
    console.log('Processed result:', result);
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
