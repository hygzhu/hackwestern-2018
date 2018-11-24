const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
//const Data = require("./data");
const SerialPort = require('serialport');
// const SerialPort = serialport.SerialPort;
const Readline = SerialPort.parsers.Readline;

const arduinoPort = new SerialPort('\\\\.\\COM5');
const parser = new Readline();

arduinoPort.pipe(parser);

const API_PORT = 3001;
const app = express();
const router = express.Router();


arduinoPort.on('open', function () {
  console.log('Serial Port Opened');
  var dataString = "";
  arduinoPort.on('data', function (data) {
      dataString += data.toString('utf8');
      console.log(dataString);
  });
});


// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

var tempInfo = [15, 16, 16, 18, 25, 25, 16];

router.get("/getData", (req, res) => {
  return res.json({tempData: tempInfo, name: "Temperature information"});
});

// append /api for our http requests
app.use("/api", router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));