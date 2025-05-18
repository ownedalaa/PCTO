volatile int pulseCount = 0;
float flowRate = 0.0;

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

  if (currentTime - lastSendTime >= 3000) {
    detachInterrupt(digitalPinToInterrupt(sensorPin));  // stop counting

    // Calculate flow rate in L/min
    // YF-S201: 450 pulses = 1 liter => 7.5 pulses/sec = 1 L/min
    float freq = pulseCount / 3.0; // pulses per second (over 3s)
    flowRate = freq / 7.5;         // L/min

    // Send over serial
    Serial.print(zone);
    Serial.print(": ");
    Serial.println(flowRate, 2); // 2 decimal places

    pulseCount = 0;
    lastSendTime = currentTime;

    attachInterrupt(digitalPinToInterrupt(sensorPin), countPulse, RISING);
  }
}

void countPulse() {
  pulseCount++;
}
