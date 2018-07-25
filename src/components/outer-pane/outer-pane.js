import React, { Component } from 'react'
import './outer-pane.css';
import LeftPane from '../left-pane/left-pane';
import RightPane from '../right-pane/right-pane';
import * as Keywords from '../../mock data/keywords.json';
import * as Markers from '../../mock data/markers.json';

export default class OuterPane extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentTime: 5,
      tags: Keywords,
      staticMarkers: Markers
    }
  }

  componentDidMount() {
    console.log(this.state.markers);
    
  }

  changeTime(time) {
    this.setState({ currentTime: time });
  }

  

  addMarkers = () => {
    this.setState((prevState) => {
      prevState.markers.push({time: 15, text: "Substitution", class: "fa fa-exchange-alt"});
      return {markers: prevState.markers};
    })
  }

  render() {
    // console.log(this.state);
    return (
      <div id="outerpane" className="container-fluid">
        <div className="mt-4 h-100 row">
          <LeftPane tags= {this.state.tags} staticMarkers={this.state.staticMarkers} currentTime={this.state.currentTime} listOfIntervals={this.state.listOfIntervals} />
        </div>
      </div>
    )
  }
}
