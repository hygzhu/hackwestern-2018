import React, { Component } from 'react';
import axios from "axios";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
//import logo from './logo.svg';
import './App.css';

import LineGraph from './components/LineGraph';
import NodeBox from './components/NodeBox';

const Checkbox = ({ type = 'checkbox', name, checked = false, onChange }) => (
  <input type={type} name={name} checked={checked} onChange={onChange} />
);
class App extends Component {

  state = {
    nodes: [],
    displayGraph: false,
    showGraph: false,
    graphIndex: 0,
    count: 0,
    checkBoxes: [
      {
        name: 'filter-1',
        label: 'Sleep rooms',
      },
      {
        name: 'filter-2',
        label: 'Discussion rooms',
      },
      {
        name: 'filter-3',
        label: 'Work rooms',
      }
    ],
    checkedItems: new Map()
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

  setGraphIndex(graphIndex) {
    this.setState({showGraph: true, displayGraph: true, graphIndex: graphIndex});
  }

  setHideGraph() {
    this.setState({showGraph: false, displayGraph: false});
    console.log(this.state.showGraph);
    // setTimeout(() => {
    //   this.setState({
    //     displayGraph: false
    //   });
    //   console.log(this.state.displayGraph);
    // }, 1000);
  }

  handleFilterChange(e) {
    const item = e.target.name;
    const isChecked = e.target.checked;
    this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
  }

  render() {
    const nodes = this.state.nodes;
    const checkBoxes = this.state.checkBoxes;
    console.log(nodes);

    var graphDisplay = (
      <div id="graph-container" style={{display: this.state.displayGraph ? "block" : "none"}}>
        <i onClick={() => {this.setHideGraph()}} className="far fa-times-circle"></i>
        <LineGraph color="#8884d8" field="temperature" data={nodes[this.state.graphIndex] ? nodes[this.state.graphIndex] : {}}/>
        <LineGraph color="#1abc9c" field="sound" data={nodes[this.state.graphIndex] ? nodes[this.state.graphIndex] : {}}/>
        <LineGraph color="#f4d03f" field="light" data={nodes[this.state.graphIndex] ? nodes[this.state.graphIndex] : {}}/>
      </div>
    )

    return (
      <div className="App">
        <header className="App-header">
          {/*<img src={logo} className="App-logo" alt="logo" />*/}
          <h1>Event Activity Heatmap</h1>

          <div className="filter-container">
          {checkBoxes.map((item, i) => (
            <label key={i}>
              <p>{item.label}</p>   
              <Checkbox name={item.name} checked={this.state.checkedItems.get(item.name)} onChange={this.handleFilterChange.bind(this)} />
            </label>
            ))
          }
          </div>
        </header>
        <div className="node-container">
          {nodes.map((node, i) => {
            return <NodeBox handleClick={this.setGraphIndex.bind(this)} data={node} key={i} graphIndex={i}/>;
          })}
        </div>
        {graphDisplay}
      </div>
    );
  }
}

export default App;
