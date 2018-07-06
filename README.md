
import React, { Component } from 'react';
import CustomDatePicker from '@proworkdev/react-custom-date-picker';

class App extends Component {

  state = {
    currentDate:new Date("26 august 2020")
  }
  getDate = (date) => {
    this.setState({currentDate:date});
  }
  render() {
    return (
      <div className="App">
      <CustomDatePicker onChange={this.getDate} value={this.state.currentDate}/>     
      </div>
    );
  }
}

export default App;

```
##Props

Prop | Description | Type | Default 
--- | --- | --- | --- |
value | Date Picker Value | Date Object | current date
onChange | Funnction trigger on change value | func | 
disabledDays | Disabled Days | Array of dates object | null
disabled | picker disabled | boolean | false
activeSlotBackground | Color of active week | string | '#6997ff'
 