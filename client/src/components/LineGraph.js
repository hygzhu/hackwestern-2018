import React, { Component } from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

class LineGraph extends Component {

  render () {
    return (
      <div className={"graph-view graph-" + this.props.field}>
        <LineChart width={550} height={140} data={this.props.data.nodeData}>
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey="name" padding={{left: 30, right: 30}}/>
        <YAxis/>
        <Tooltip/>
        <Legend />
        <Line type="monotone" dataKey={this.props.field} stroke={this.props.color} activeDot={{r: 8}}/>
        </LineChart>
      </div>
    );
  }
}

export default LineGraph;