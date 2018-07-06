import React, { Component } from 'react';
import './App.css';
import DatePicker from './components/DatePicker/';

class App extends Component {

  state = {
    currentDate:new Date("26 august 2020")
  }
  getDate = (date) => {
    console.log(date)
this.setState({currentDate:date});
  }
  render() {
    return (
      <div className="App">
      <DatePicker onChange={this.getDate} value={this.state.currentDate}/>
      
      </div>
    );
  }
}

export default App;
