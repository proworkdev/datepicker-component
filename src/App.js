import React, { Component } from 'react';
import './App.css';
import DatePicker from './components/DatePicker/';

class App extends Component {

  state = {
    currentDate:new Date("28 august 2020")
  }
  getDate = (date) => {
    this.setState({currentDate:date});
  }
  render() {
    return (
      <div className="App">
      <DatePicker value={this.state.currentDate}/>
      
      </div>
    );
  }
}

export default App;
