/*
  Display.ino
  2013 Copyright (c) Seeed Technology Inc.  All right reserved.

  Author:Loovee
  2013-9-18

  Grove - Serial LCD RGB Backlight demo.

  This library is free software; you can redistribute it and/or
  modify it under the terms of the GNU Lesser General Public
  License as published by the Free Software Foundation; either
  version 2.1 of the License, or (at your option) any later version.

  This library is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
  Lesser General Public License for more details.

  You should have received a copy of the GNU Lesser General Public
  License along with this library; if not, write to the Free Software
  Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/

/*
DO NOT CHANGE THIS FILE
*/

#include <math.h>
#include <Wire.h>
#include "rgb_lcd.h"

// For LCD display
rgb_lcd lcd;
// For calculating temperature
const int B = 4275;               // B value of the thermistor
const int R0 = 100000;            // R0 = 100k
// Pin attachments for sensors
const int pinLightSensor = A0;    // Light sensor connect to A0
const int pinTempSensor = A1;     // Grove - Temperature Sensor connect to A1
const int pinNoiseSensor = A2;    // Noise sensor connect to A2
// For aggregating data
int tempMax = 80;
int tempMin = 40;
float noiseMax = 1100;
float noiseMin = 0;
const int lightMax = 1100;
const int lightMin = 0;
const int totalRGVal = 255 + 255;
int cycles = 0;

void setup() {
    // set up the LCD's number of columns and rows:
    lcd.begin(16, 2);
    // Print a message to the LCD.
//    lcd.print("hello, world!");
    Serial.begin(9600);
}

void loop() {
    int light = analogRead(pinLightSensor);
//    Serial.print("Light = ");
    Serial.println(light);
    
    int a = analogRead(pinTempSensor);
    float R = 1023.0/a-1.0;
    R = R0*R;
    float temperature = 1.0/(log(R/R0)/B+1/298.15)-273.15; // convert to temperature via datasheet
//    Serial.print("temperature = ");
    Serial.println(temperature);
//    Serial.println(a);
    if (temperature > tempMax) tempMax = temperature;
    if (temperature < tempMin) tempMin = temperature;

    long noise = 0;
    for(int i=0; i<32; i++) {
        noise += analogRead(pinNoiseSensor);
    } // for

    noise >>= 5;

//    Serial.print("Noise level: ");
//    noise = max(0, 1100 - noise);
    Serial.println(noise);
    if (noise > noiseMax) noiseMax = noise;
    if (noise < noiseMin) noiseMin = noise;

    if (cycles == 10) {
      // Change color
      int tempVal = totalRGVal / (tempMax - tempMin) * (temperature - tempMin);
      float soundVal = totalRGVal / (noiseMax - noiseMin) * (noise - noiseMin);
      float totalVal = tempVal * 0.75 + soundVal * 0.25;
//      Serial.print("Temp: ");
//      Serial.println(tempVal);
//      Serial.print("Sound: ");
//      Serial.println(soundVal);
//      Serial.print("Total: ");
//      Serial.println(totalVal);
      if (light < 100) {
        lcd.setRGB(0, 0, 255);
      } else {
        if (totalVal < 255) {
          lcd.setRGB(0, max(255 - totalVal, 10), 0);
        } else {
          lcd.setRGB(max(totalVal - 255, 10), 0, 0);
        } // if
      } // if
      cycles = 0;
    } else {
      cycles++;
    } // if
    
    delay(100);
}

/*********************************************************************************************************
  END FILE
*********************************************************************************************************/
