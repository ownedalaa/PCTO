volatile int pulseCount = 0;
float totalLiters = 0.0;

unsigned long lastSendTime = 0;
const int sensorPin = 2; // Must support interrupts (D2 on Uno)

const char* zone = "K";  // Set your current zone label here

void setup() {
  Serial.begin(9600);
  pinMode(sensorPin, INPUT_PULLUP);
  attachInterrupt(digitalPinToInterrupt(sensorPin), countPulse, RISING);
}

void loop() {
  unsigned long currentTime = millis();

  if (currentTime - lastSendTime >= 1000) {  // Measure every 1 second
    detachInterrupt(digitalPinToInterrupt(sensorPin));  // stop counting

    // YF-S201: 450 pulses = 1 liter
    float litersThisSecond = pulseCount / 450.0;
    totalLiters += litersThisSecond;

    // Send total liters over serial
    Serial.print(zone);
    Serial.print(": ");
    Serial.println(totalLiters, 2);  // 2 decimal places

    pulseCount = 0;
    lastSendTime = currentTime;

    attachInterrupt(digitalPinToInterrupt(sensorPin), countPulse, RISING);
  }
}

void countPulse() {
  pulseCount++;
}
