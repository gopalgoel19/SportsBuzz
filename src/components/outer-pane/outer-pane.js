import React, { Component } from 'react'
import './outer-pane.css';
import LeftPane from '../left-pane/left-pane';
import RightPane from '../right-pane/right-pane';

export default class OuterPane extends Component {
  state = {
    currentTime: 5,
    tags: ['Ronaldo', 'Goal', 'Free Kick'],
  }

  changeTime(time) {
    this.setState({currentTime: time});
  }

  render() {
    return (
      <div id="outerpane" className="container-fluid">
      {/* <button onClick={this.changeTime.bind(this,1)}>1</button>
      <button onClick={this.changeTime.bind(this,3)}>3</button>
      <button onClick={this.changeTime.bind(this,5)}>5</button> */}
        <div className="mt-4 h-100 row">
          <LeftPane currentTime={this.state.currentTime}/>
          <RightPane tags={this.state.tags}/>
        </div>
      </div>
    )
  }
}
