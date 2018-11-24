import React, { Component } from 'react';
import axios from "axios";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
//import logo from './logo.svg';
import './App.css';

import LineGraph from './components/LineGraph';
import NodeBox from './components/NodeBox';

class App extends Component {

  state = {
    nodes: [],
    displayGraph: -1,
    count: 0
  };

  componentDidMount() {
    var intervalId = setInterval(this.getDataFromDb, 1000);
    //this.getDataFromDb();
    this.setState({intervalId : intervalId});
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  getDataFromDb = () => {
    this.setState({count: this.state.count + 1});
    //console.log("GET STATE : " + this.state.count);
    fetch("http://localhost:3001/api/getData")
      .then(data => data.json())
      .then(res => {
        this.setState({ nodes: res.data })
        //console.log(res.data);
      });
  };

  setGraphDisplay(graphIndex) {
    this.setState({displayGraph: graphIndex});
    console.log(this.state.displayGraph);
  }

  render() {
    const nodes = this.state.nodes;
    console.log(nodes);

    var graphDisplay = (
      <div id="graph-container" style={{opacity: this.state.displayGraph == -1 ? 0 : 100, visibility: this.state.displayGraph == -1 ? "hidden" : "visible"}}>
        <i onClick={() => {this.setGraphDisplay(-1)}} class="far fa-times-circle"></i>
        <LineGraph color="#8884d8" field="temperature" data={nodes[this.state.displayGraph] ? nodes[this.state.displayGraph] : {}}/>
        <LineGraph color="#1abc9c" field="sound" data={nodes[this.state.displayGraph] ? nodes[this.state.displayGraph] : {}}/>
        <LineGraph color="#f4d03f" field="light" data={nodes[this.state.displayGraph] ? nodes[this.state.displayGraph] : {}}/>
      </div>
    )

    return (
      <div className="App">
        <header className="App-header">
          {/*<img src={logo} className="App-logo" alt="logo" />*/}
          <h1>Event Activity Heatmap</h1>
        </header>
        <div className="node-container">
          {nodes.map((node, i) => {
            return <NodeBox handleClick={this.setGraphDisplay.bind(this)} data={node} key={i} graphIndex={i}/>;
          })}
        </div>
        {graphDisplay}
      </div>
    );
  }
}

export default App;
