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
          <div className="col-4">
           
          </div>
          <hr />
        </div>
      </div>
    )
  }
}
