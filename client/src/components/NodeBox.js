import React, { Component } from 'react';
import Rainbow from 'rainbowvis.js';

class NodeBox extends Component {

  state = {
    temperature: {
      min: 16,
      max: 42
    },
    sound: {
      min: 33,
      max: 47
    },
    light: {
      min: 0,
      max: 105
    }
  };

  render () {
    var nodeData = this.props.data ? this.props.data : {};
    var latestData = nodeData.nodeData ? nodeData.nodeData.slice(-1)[0] : {temperature: 22, sound: 33, light: 39};
    var latestTemp = Math.round(latestData.temperature);
    var latestSound = Math.round(latestData.sound);
    var latestLight = Math.round(latestData.light);

    var indicator = new Rainbow();
    indicator.setNumberRange(0, 20);
    indicator.setSpectrum('#195aff', '#f71f13');
    var tempColor = indicator.colorAt(Math.floor((latestTemp / this.state.temperature.max) * 20));
    var soundColor = indicator.colorAt(Math.floor((latestSound / this.state.sound.max) * 20));
    var lightColor = indicator.colorAt(Math.floor((latestLight / this.state.light.max) * 20));
    //console.log("Temp Color: " + tempColor + typeof tempColor);

    return (
      <div className={"node-box " + nodeData.nodeId} onClick={() => {this.props.handleClick(this.props.graphIndex)}}>
        <p className="node-title">{nodeData.nodeName}</p>
        <div className="node-gauges">
          <div className="indicator-circle" style={{"backgroundColor": "#" + tempColor}}> </div>
          <p className="node-label"><i className="fas fa-temperature-high"></i>  {latestTemp}</p>
          <div className="indicator-circle" style={{"backgroundColor": "#" + soundColor}}> </div>
          <p className="node-label"><i className="fas fa-volume-up"></i>  {latestSound}</p>
          <div className="indicator-circle" style={{"backgroundColor": "#" + lightColor}}> </div>
          <p className="node-label"><i className="fas fa-lightbulb"></i>  {latestLight}</p>
        </div>
      </div>
    );
  }
}

export default NodeBox;