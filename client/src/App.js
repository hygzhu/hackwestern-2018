import React, { Component } from 'react';
import axios from "axios";
//import logo from './logo.svg';
//import './App.css';

class App extends Component {

  state = {
    temperatureData: [],
  };

  componentDidMount() {
    this.getDataFromDb();
  }

  getDataFromDb = () => {
    fetch("/api/getData")
      .then(data => data.json())
      .then(res => this.setState({ temperatureData: res.tempData }));
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/*<img src={logo} className="App-logo" alt="logo" />*/}
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
        </header>
      </div>
    );
  }
}

export default App;
