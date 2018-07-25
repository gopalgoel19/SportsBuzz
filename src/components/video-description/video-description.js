import React, { Component } from 'react';
import './video-description.css';
import Marker from '../marker/marker';
export default class VideoDescription extends Component {
  render() {
    // console.log(this.props.listOfIntervals);
    const listOfMarkers = this.props.listOfIntervals.map((obj) => <Marker start={obj.startTime} end={obj.endTime} />);
    // console.log(listOfMarkers);
    return (
      <div className="height200 col-12">
        <div className="row">
        {listOfMarkers}
        </div>
        <div className="row mt-3">
          <div className="col-4">
            <span className="row lead-text">France vs Croatia</span>
            <span className="row footer-text">Tournament: World Cup </span>
          </div>
          <hr />
        </div>
        <br />
        <div className="row">
           <p>France's array of superstars came out to shine as Antoine Griezmann, Paul Pogba and Kylian Mbappe fired them to World Cup glory with an emphatic 4-2 win over Croatia.</p>
        </div>
     
      </div>
    )
  }
}
