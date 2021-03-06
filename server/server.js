const __DEBUG = true;

const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");
//const Data = require("./data");
const SerialPort = require('serialport');
const Delimiter = require('@serialport/parser-delimiter')
// const SerialPort = serialport.SerialPort;
// const Readline = SerialPort.parsers.Readline;

const arduinoPort = new SerialPort('\\\\.\\COM5');
const parser = arduinoPort.pipe(new Delimiter({ delimiter: '\n'}));

const API_PORT = 3001;
const app = express();
const router = express.Router();

app.use(cors());
app.options('*', cors());
// var tempInfo = [15, 16, 16, 18, 25, 25, 16];
var lightInfo = 0;
var tempInfo = 0;
var noiseInfo = 0; //innacurrate way
var noiseMax = 0;

var graphData = [
  {
    nodeName: "Left Hallway (Live)",
    nodeId: "live-data-room",
    nodeData: []
  },
  {
    nodeName: "Computer Lab 2",
    nodeId: "sleeping-room",
    nodeData: []
  },
  {
    nodeName: "Undergrad Design Lab 2",
    nodeId: "loud-room",
    nodeData: []
  },
  {
    nodeName: "Undergrad Design Lab 1",
    nodeId: "work-room",
    nodeData: []
  },
  {
    nodeName: "Digital Lab",
    nodeId: "loud-room-2",
    nodeData: []
  }
];
var room1 = [];
var room2 = [];
var room3 = [];
var room4 = [];
var room5 = [];

var dataString = "";
var curInput = 0; // 0 = light, 1 = temperature, 2 = noise
var curIter = 1;
const maxIter = 20; // 20 datapoints with 100ms delay between each (new node every 2s)
const maxDataPoints = 15;
// 0 = light, 1 = temperature, 2 = noise
parser.on('data', function (data) {
  dataString = data.toString('utf8');
  if (curIter == maxIter) { // Calculate average data
    var date = new Date();
    var time = date.getHours().toString();
    time += ":" + date.getMinutes().toString();
    time += ":" + date.getSeconds().toString();
    console.log("Server time: " + time );
    // Calculate Averages and put in a node
    var avgLight = round2Dec(lightInfo/maxIter);
    if (avgLight < 0) { avgLight = 0; } 
    else if (avgLight > 100) { avgLight = 100; }

    var avgTemp = round2Dec(tempInfo/maxIter);
    if (avgTemp < 10) { avgTemp = 10; } 
    else if (avgTemp > 40) { avgTemp = 40; }

    var avgNoise = round2Dec(noiseInfo/maxIter);
    if (avgNoise < -999) { avgNoise = 45; }
    else if (avgNoise < 35) { avgNoise = 35; }
    else if (avgNoise > 50) { avgNoise = 50; }

    if (__DEBUG) {  // Print debug messages
      console.log("light: " + avgLight);
      console.log("TEMP: " + avgTemp);
      console.log("noise: " + avgNoise);
    } // if

    var light2 = round2Dec(10 + ((Math.random() * 1) + 5) * (Math.random() < 0.5 ? -1 : 1));
    var temperature2 = round2Dec(22 + (Math.floor((Math.random() * 2) * Math.random() < 0.5 ? -1 : 1)));
    var sound2 = round2Dec(40 + (Math.floor((Math.random() * 1) + 3) * (Math.random() < 0.5 ? -1 : 1)));

    var light3 = round2Dec(90 + ((Math.random() * 1) + 5) * (Math.random() < 0.5 ? -1 : 1));
    var temperature3 = round2Dec(28 + (Math.floor((Math.random() * 2) * Math.random() < 0.5 ? -1 : 1)));
    var sound3 = round2Dec(65 + (Math.floor((Math.random() * 1) + 3) * (Math.random() < 0.5 ? -1 : 1) ));

    var light4 = round2Dec(80 + ((Math.random() * 1) + 5) * (Math.random() < 0.5 ? -1 : 1));
    var temperature4 = round2Dec(24 + (Math.floor((Math.random() * 2) * Math.random() < 0.5 ? -1 : 1)));
    var sound4 = round2Dec(50 + ((Math.random() * 1) + 3) * (Math.random() < 0.5 ? -1 : 1));
    
    var light5 = round2Dec(90 + ((Math.random() * 1) + 5) * (Math.random() < 0.5 ? -1 : 1));
    var temperature5 = round2Dec(28 + (Math.floor((Math.random() * 2) * Math.random() < 0.5 ? -1 : 1)));
    var sound5 = round2Dec(65 + (Math.floor((Math.random() * 1) + 3) * (Math.random() < 0.5 ? -1 : 1) ));
    
    var totalAvgLight = Math.round((avgLight + light2 + light3 + light4 + light5) / 5 * 100) / 100;
    var totalAvgTemp = Math.round((avgTemp + temperature2 + temperature3 + temperature4 + temperature5) / 5 * 100) / 100;
    var totalAvgSound = Math.round((avgNoise + sound2 + sound3 + sound4 + sound5) / 5 * 100) / 100;

    var node = {
      name: time,
      light: avgLight,
      temperature: avgTemp,
      sound: noiseMax,
      tempOpt: 24,
      soundOpt: 50,
      averageLight: totalAvgLight,
      averageTemp: totalAvgTemp,
      averageSound: totalAvgSound
    }
    //dark room
    var node2 = {
      name: time,
      light: light2,
      temperature: temperature2,
      sound: sound2,
      tempOpt: 24,
      soundOpt: 50,
      averageLight: totalAvgLight,
      averageTemp: totalAvgTemp,
      averageSound: totalAvgSound
    }
    //loud and hot
    var node3 = {
      name: time,
      light: light3,
      temperature: temperature3,
      sound: sound3,
      tempOpt: 24,
      soundOpt: 50,
      averageLight: totalAvgLight,
      averageTemp: totalAvgTemp,
      averageSound: totalAvgSound
    }
    var node4 = {
      name: time,
      light: light4,
      temperature: temperature4,
      sound: sound4,
      tempOpt: 24,
      soundOpt: 50,
      averageLight: totalAvgLight,
      averageTemp: totalAvgTemp,
      averageSound: totalAvgSound
    }
    var node5 = {
      name: time,
      light: light5,
      temperature: temperature5,
      sound: sound5,
      tempOpt: 24,
      soundOpt: 50,
      averageLight: totalAvgLight,
      averageTemp: totalAvgTemp,
      averageSound: totalAvgSound
    }
    room1.push(node);
    room2.push(node2);
    room3.push(node3);
    room4.push(node4);
    room5.push(node5);

    if (room1.length > maxDataPoints) room1.shift();
    if (room2.length > maxDataPoints) room2.shift();
    if (room3.length > maxDataPoints) room3.shift();
    if (room4.length > maxDataPoints) room4.shift();
    if (room5.length > maxDataPoints) room5.shift();
    // Reset tallies
    curIter = 0;
    lightInfo = 0;
    tempInfo = 0;
    noiseInfo = 0;
    noiseMax = 0;
    graphData[0].nodeData = room1;
    graphData[1].nodeData = room2;
    graphData[2].nodeData = room3;
    graphData[3].nodeData = room4;
    graphData[4].nodeData = room5;
    if (__DEBUG) console.log(graphData);
  }
  switch (curInput) { // cycle through the 3 input types
    case 0:
      lightInfo += toPercentageBrightness(parseFloat(data.toString('utf8')));
      curInput++;
      break;
    case 1:
      tempInfo += toCelsius(parseFloat(data.toString('utf8')));
      curInput++;
      break;
    case 2:
      //noiseInfo += toDecibels(parseFloat(data.toString('utf8')));
      noiseMax = round2Dec(Math.max(noiseMax, toDecibels(parseFloat(data.toString('utf8')))));
      // console.log(noiseMax);
      curInput = 0;
      curIter++;
      break;
  } // switch
});
// });


// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

// var data = [
//   {
//     nodeName: "Room A400",
//     nodeData:
//     [
//       {name: '1121', temperature: 4000, sound: 2400, light: 2400},
//       {name: '1122', temperature: 3000, sound: 1398, light: 2210},
//       {name: '1123', temperature: 2000, sound: 9800, light: 2290},
//       {name: '1124', temperature: 2780, sound: 3908, light: 2000},
//       {name: '1125', temperature: 1890, sound: 4800, light: 2181},
//       {name: '1126', temperature: 2390, sound: 3800, light: 2500},
//       {name: '1127', temperature: 3490, sound: 4300, light: 2100},
//     ]
//   },
//   {
//     nodeName: "Room B2",
//     nodeData:
//     [
//       {name: '1121', temperature: 25, sound: 500, light: 500},
//       {name: '1122', temperature: 26, sound: 550, light: 550},
//       {name: '1123', temperature: 26, sound: 590, light: 600},
//       {name: '1124', temperature: 27, sound: 570, light: 500},
//       {name: '1125', temperature: 26, sound: 560, light: 480},
//       {name: '1126', temperature: 28, sound: 550, light: 488},
//       {name: '1127', temperature: 29, sound: 600, light: 489},
//     ]
//   }
// ];

//Temperature currently goes from 0 - 150 and then becomes infinity
//Light ranges from 0-1000
//Sound ranges 0-1000 (Ambient sound is around 200)

router.get("/getData", (req, res) => {
  console.log(graphData);
  return res.json({data: graphData});
});

// append /api for our http requests
app.use("/api", router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));

//Helper function zone

//converts the arduino noise level to decibels
function toDecibels(noise){

  //console.log("Noise level: " + noise)

  //Get the 40db mark (quiet office) TODO: Need to calibrate
  const frame = 100;

  //Need to calibrate against a sound meter
  let db_change = 20*Math.log10(noise/frame);

  //console.log("DB Change:" + db_change);

  return 45 + db_change;
}

function toCelsius(temp) {
  return temp - 30;
}

// Gets the percentage brightness
function toPercentageBrightness(brightness) {
  const maxBrightness = 1100;

  return Math.floor(brightness / maxBrightness * 100);
}

function round2Dec(num) {
  return Math.round(num * 100) / 100;
}