import React, { Component } from 'react'
import './outer-pane.css';
import LeftPane from '../left-pane/left-pane';
import RightPane from '../right-pane/right-pane';

export default class OuterPane extends Component {

  constructor(props){
    super(props);
    this.state = {
      currentTime: 5,
      tags: {
        "Neymar": [
          {
            startTime: 0,
            endTime: 10
          },
          {
            startTime: 20,
            endTime:30
          },
          {
            startTime: 40,
            endTime: 50
          },
          {
            startTime: 60,
            endTime: 70
          }
        ],
        "Goal": [
          {
            startTime: 0,
            endTime: 10
          }
        ],
        "Messi": [
          {
            startTime: 0,
            endTime: 10
          },
          {
            startTime: 20,
            endTime:30
          }
        ]
      },
      listOfIntervals: []
    }
  }
  

  changeTime(time) {
    this.setState({currentTime: time});
  }

  onTagSelect(TagName){
    this.setState(()=>{
      return {listOfIntervals: this.state.tags[TagName] }
    });
  }

  onTagUnselect(TagName){
    alert('hey');
  }

  render() {
    // console.log(this.state);
    return (
      <div id="outerpane" className="container-fluid">
      {/* <button onClick={this.changeTime.bind(this,1)}>1</button>
      <button onClick={this.changeTime.bind(this,3)}>3</button>
      <button onClick={this.changeTime.bind(this,5)}>5</button> */}
        <div className="mt-4 h-100 row">
          <LeftPane currentTime={this.state.currentTime} listOfIntervals={this.state.listOfIntervals}/>
          <RightPane tags={this.state.tags} onTagSelect={this.onTagSelect.bind(this)} onTagUnselect={this.onTagUnselect.bind(this)}/>
        </div>
      </div>
    )
  }
}
