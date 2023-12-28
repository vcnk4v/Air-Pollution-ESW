#include <SDS011.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <Adafruit_AHTX0.h>

Adafruit_AHTX0 aht;

float p10, p25;
int error;
SDS011 my_sds;

const char* ssid = "JioFi3_259D0E";
const char* pass = "k61m12m0u5";

long channelID = 2298573;
const char* writeAPIKey = "N9P141P375WD53OS";

void setup() {
  my_sds.begin(16, 17); // 16-RX 17-TX
  Serial.begin(9600);

  // Initialize AHT sensor
  // if (!aht.begin()) {
  //   Serial.println("Failed to find AHT10/AHT20 chip");
  //   while (1) {
  //     delay(10);
  //   }
  // }
  // Serial.println("AHT10/AHT20 Found!");

  WiFi.begin(ssid, pass);
  while (WiFi.status() != WL_CONNECTED) {
    Serial.println("Connecting to WiFi...");
    delay(1000);
  }
  Serial.println("WiFi Connected!");
}

void loop() {
  error = my_sds.read(&p25, &p10);

  // Read from AHT sensor
  // sensors_event_t humidity, temp;
  // aht.getEvent(&humidity, &temp);

  if (!error) {
    Serial.println("P2.5: " + String(p25));
    Serial.println("P10:  " + String(p10));

    // Serial.print("Temperature: ");
    // Serial.print(temp.temperature);
    // Serial.println(" degrees C");
    // Serial.print("Humidity: ");
    // Serial.print(humidity.relative_humidity);
    // Serial.println("% rH");

    // Create a URL for the ThingSpeak update
    String url = "https://api.thingspeak.com/update?api_key=" + String(writeAPIKey) +
                 "&field1=" + String(p25) +
                 "&field2=" + String(p10);

    // Send the HTTP POST request
    HTTPClient http;
    http.begin(url);
    int httpCode = http.GET();
    if (httpCode > 0) {
      Serial.println("HTTP Response code: " + String(httpCode));
    } else {
      Serial.println("HTTP Error");
    }
    http.end();
  }
  delay(60000); // Delay for one minute before the next update
}