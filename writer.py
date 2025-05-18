import serial
import time
import os

FILE_PATH = "WaterFlow\\values.txt"  # Make sure this file exists
MAX_LINES = 10

def main():
    ser = serial.Serial('COM8', 9600, timeout=1)  # Change COM port if needed
    time.sleep(2)  # Let Arduino reset

    while True:
        try:
            line = ser.readline().decode('utf-8').strip()

            if not line:
                continue

            try:
                zone, value = line.split(":")
                value = float(value.strip())
                formatted_line = f"{zone.strip()}: {value:.1f}"
            except ValueError:
                continue  # skip malformed lines

            print(f"Received: {formatted_line}")

            # Read existing lines in the correct order
            lines = []
            if os.path.exists(FILE_PATH):
                with open(FILE_PATH, 'r') as file:
                    lines = file.read().splitlines()

            # Append new line at the bottom
            lines.append(formatted_line)

            # Keep only the last MAX_LINES lines
            lines = lines[-MAX_LINES:]

            # Write back to the file in order (top to bottom)
            with open(FILE_PATH, 'w') as file:
                for line in lines:
                    file.write(line + '\n')

            time.sleep(3)

        except KeyboardInterrupt:
            print("Stopped by user")
            break

if __name__ == "__main__":
    main()
