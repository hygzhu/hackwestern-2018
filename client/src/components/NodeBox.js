import React, { Component } from 'react';
import Rainbow from 'rainbowvis.js';

class NodeBox extends Component {

  state = {
    temperature: {
      min: 0,
      max: 3000
    },
    sound: {
      min: 0,
      max: 1200
    },
    light: {
      min: 0,
      max: 1100
    }
  };

  render () {
    var nodeData = this.props.data ? this.props.data : {};
    var latestData = nodeData.nodeData ? nodeData.nodeData.slice(-1)[0] : [];

    var tempIndicator = new Rainbow();
    tempIndicator.setNumberRange(0, 20);
    tempIndicator.setSpectrum('#195aff', '#f71f13');
    var tempColor = tempIndicator.colorAt(Math.floor((latestData.temperature / this.state.temperature.max) * 20));
    console.log("Temp Color: " + tempColor + typeof tempColor);

    var tempStyle = {
      "font-size": "20px", 
      "color": "#" + tempColor
    };

    return (
      <div className="node-box" onClick={() => {this.props.handleClick(this.props.graphIndex)}}>
        <p className="node-title">{nodeData.nodeName}</p>
        <div className="node-gauges">
          <div className="indicator-circle" style={{"backgroundColor": "#" + tempColor}}> </div>
          <p className="node-label"><i className="fas fa-temperature-high"></i>  {latestData.temperature}</p>
          <div className="indicator-circle"> </div>
          <p className="node-label"><i className="fas fa-volume-up"></i>  {latestData.sound}</p>
          <div className="indicator-circle"> </div>
          <p className="node-label"><i className="fas fa-lightbulb"></i>  {latestData.light}</p>
        </div>
      </div>
    );
  }
}

export default NodeBox;