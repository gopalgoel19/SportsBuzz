import React, { Component } from 'react'
import './video-description.css';
export default class VideoDescription extends Component {
  render() {
    return (
      <div className="height200 mt-3 col-12">
        <div className="row">
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
