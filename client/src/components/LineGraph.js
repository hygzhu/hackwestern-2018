import React, { Component } from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

class LineGraph extends Component {

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

    var roundedData = this.props.data.nodeData;

    return (
      <div className={"graph-view graph-" + this.props.field}>
        <LineChart width={550} height={140} data={this.props.data.nodeData}>
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey="name" padding={{left: 30, right: 30}}/>
        <YAxis domain={[this.state[this.props.field].min, this.state[this.props.field].max]}/>
        <Tooltip/>
        <Legend />
        <Line isAnimationActive={false} type="monotone" dataKey={this.props.field} stroke={this.props.color} activeDot={{r: 3}}/>
        </LineChart>
      </div>
    );
  }
}

export default LineGraph;