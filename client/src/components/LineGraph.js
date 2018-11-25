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

    // console.log(this.props.data.nodeData);
    // for (var i = 0; i < this.props.data.nodeData.length; i++) {
    //   switch (this.props.field) {
    //     case 'temperature':
    //       this.props.data.nodeData[i].optimal1 = 18;
    //       this.props.data.nodeData[i].optimal2 = 24;
    //       break;
    //     case 'sound':
    //       this.props.data.nodeData[i].optimal1 = 50;
    //       this.props.data.nodeData[i].optimal2 = 64;
    //       break;
    //     case 'light':
    //       this.props.data.nodeData[i].optimal1 = 18;
    //       this.props.data.nodeData[i].optimal2 = 18;
    //       break;
    //   }
    // }

    return (
      <div className={"graph-view graph-" + this.props.field}>
        <LineChart width={550} height={140} data={this.props.data.nodeData}>
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey="name" padding={{left: 30, right: 30}}/>
        <YAxis domain={[this.state[this.props.field].min, this.state[this.props.field].max]}/>
        <Tooltip/>
        <Legend />
        <Line isAnimationActive={false} type="monotone" dataKey={this.props.field} stroke={this.props.color} activeDot={{r: 3}}/>
        {(this.props.checkedItems.get('filter-1') || this.props.checkedItems.get('filter-3')) && this.props.field == "temperature" && <Line type="monotone" dataKey='tempOpt' stroke={this.props.color} activeDot={{r: 8}} strokeDasharray="5 5" />}
        {(this.props.checkedItems.get('filter-1') || this.props.checkedItems.get('filter-3')) && this.props.field == "sound" && <Line type="monotone" dataKey='soundOpt' stroke={this.props.color} activeDot={{r: 8}} strokeDasharray="5 5" />}
        </LineChart>
      </div>
    );
  }
}

export default LineGraph;