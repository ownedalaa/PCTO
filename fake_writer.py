import random
import time
import os

FILE_PATH = "WaterFlow\\values.txt"
MAX_LINES = 10

def simulate_water_usage():
    # Simulate a zone label and a random consumption amount
    zone = random.choice(["B", "K", "L", "O"])
    # Random value between 0.5 and 5.0 liters with exactly 1 decimal place
    value = round(random.uniform(0.5, 5.0), 1)
    
    # Format EXACTLY as "X: Y" with no extra spaces
    formatted_line = f"{zone}: {value}"
    
    # Debug check to make sure our format matches the expected pattern
    import re
    pattern = r"^([A-Z]):\s*(\d+\.\d+|\d+)$"
    if not re.match(pattern, formatted_line):
        print(f"Warning: Line '{formatted_line}' does not match expected pattern")
    
    return formatted_line

def main():
    while True:
        try:
            # Generate new reading
            line = simulate_water_usage()
            print(f"Generated: {line}")

            # Read existing lines
            lines = []
            if os.path.exists(FILE_PATH):
                with open(FILE_PATH, 'r') as file:
                    lines = file.read().splitlines()
                    # Remove any empty lines
                    lines = [l for l in lines if l.strip()]

            # Append new line and keep only the latest MAX_LINES
            lines.append(line)
            lines = lines[-MAX_LINES:]

            # Write back to file with exact format
            with open(FILE_PATH, 'w') as file:
                file.write('\n'.join(lines))
                # No extra newline at the end

            time.sleep(3)

        except KeyboardInterrupt:
            print("Stopped by user")
            break
        except Exception as e:
            print(f"Error: {e}")
            time.sleep(1)

if __name__ == "__main__":
    main()