const __DEBUG = true;

const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
//const Data = require("./data");
const SerialPort = require('serialport');
const Delimiter = require('@serialport/parser-delimiter')
// const SerialPort = serialport.SerialPort;
const Readline = SerialPort.parsers.Readline;

const arduinoPort = new SerialPort('\\\\.\\COM5');
const parser = arduinoPort.pipe(new Delimiter({ delimiter: '\n'}));

const API_PORT = 3001;
const app = express();
const router = express.Router();

// var tempInfo = [15, 16, 16, 18, 25, 25, 16];
const maxLength = 7;
var lightInfo = [];
var tempInfo = [];
var noiseInfo = [];

// arduinoPort.on('open', function () {
  // console.log('Serial Port Opened');
var dataString = "";
var curInput = 0;
// 0 = light, 1 = temperature, 2 = noise
parser.on('data', function (data) {
  dataString = data.toString('utf8');
  switch (curInput) { // cycle through the 3 input types
    case 0:
      lightInfo.push(parseFloat(data.toString('utf8')));
      if (lightInfo.length > maxLength) lightInfo.shift(); 
      if (__DEBUG) console.log("light: " + lightInfo);
      curInput++;
      break;
    case 1:
      tempInfo.push(parseFloat(data.toString('utf8')));
      if (tempInfo.length > maxLength) tempInfo.shift(); 
      if (__DEBUG) console.log("TEMP: " + tempInfo);
      curInput++;
      break;
    case 2:
      noiseInfo.push(parseFloat(data.toString('utf8')));
      if (noiseInfo.length > maxLength) noiseInfo.shift(); 
      console.log("noise: " + noiseInfo);
      curInput = 0;
      break;
  } // switch
});
// });


// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));


//Temperature currently goes from 0 - 150 and then becomes infinity
//Light ranges from 0-1000
//Sound ranges 0-1000 (Ambient sound is around 200)

router.get("/getData", (req, res) => {
  return res.json({tempData: tempInfo, name: "Temperature information"});
});

// append /api for our http requests
app.use("/api", router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));