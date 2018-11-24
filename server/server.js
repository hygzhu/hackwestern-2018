const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");
//const Data = require("./data");

const API_PORT = 3001;
const app = express();
const router = express.Router();

app.use(cors());
app.options('*', cors());

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

var data = [
  {
    nodeName: "Room A400",
    nodeData:
    [
      {name: '1121', temperature: 4000, sound: 2400, light: 2400},
      {name: '1122', temperature: 3000, sound: 1398, light: 2210},
      {name: '1123', temperature: 2000, sound: 9800, light: 2290},
      {name: '1124', temperature: 2780, sound: 3908, light: 2000},
      {name: '1125', temperature: 1890, sound: 4800, light: 2181},
      {name: '1126', temperature: 2390, sound: 3800, light: 2500},
      {name: '1127', temperature: 3490, sound: 4300, light: 2100},
    ]
  },
  {
    nodeName: "Room B2",
    nodeData:
    [
      {name: '1121', temperature: 25, sound: 500, light: 500},
      {name: '1122', temperature: 26, sound: 550, light: 550},
      {name: '1123', temperature: 26, sound: 590, light: 600},
      {name: '1124', temperature: 27, sound: 570, light: 500},
      {name: '1125', temperature: 26, sound: 560, light: 480},
      {name: '1126', temperature: 28, sound: 550, light: 488},
      {name: '1127', temperature: 29, sound: 600, light: 489},
    ]
  }
];

router.get("/getData", (req, res) => {
  console.log(data);
  return res.json({data: data});
});

// append /api for our http requests
app.use("/api", router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));