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
    indicator.setSpectrum('#206ad8', '#8016bf', '#e40008');
    var tempColor = indicator.colorAt(Math.floor((latestTemp / this.state.temperature.max) * 20));
    var soundColor = indicator.colorAt(Math.floor((latestSound / this.state.sound.max) * 20));
    var lightColor = indicator.colorAt(Math.floor((latestLight / this.state.light.max) * 20));
    //console.log("Temp Color: " + tempColor + typeof tempColor);

    var numPoints = nodeData.nodeData.length;
    var tempAvg = 0;
    var soundAvg = 0;
    var lightAvg = 0;
    for (var i = 0; i < numPoints; i++) {
      tempAvg += nodeData.nodeData[i].temperature;
      soundAvg += nodeData.nodeData[i].sound;
      lightAvg += nodeData.nodeData[i].light;
    }

    tempAvg = tempAvg / numPoints;
    soundAvg = soundAvg / numPoints;
    lightAvg = lightAvg / numPoints;

    var darkRoom = lightAvg < 31 ? true : false;
    //soundAvg = soundAvg / this.state.sound.max;
    var tempAvgColor = indicator.colorAt(Math.floor(tempAvg * 20));

    var indicatorStyle = {
      backgroundColor: darkRoom ? '#19387a' : '#e0001a',
      boxShadow: '0 0 ' + Math.pow(soundAvg,1.2)/2 + 'px ' + Math.pow(soundAvg,1.2)/2 + 'px ' + 'rgba(254, 129, 133, ' + Math.max((tempAvg - 18)/12, 0) + ')'  
    };

    return (
      <div className={"node-box " + nodeData.nodeId} onClick={() => {this.props.handleClick(this.props.graphIndex)}}>
        <div className="node-main-indicator" style={indicatorStyle}></div>
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