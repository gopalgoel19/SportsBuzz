import React, { Component } from 'react'
import './outer-pane.css';

export default class OuterPane extends Component {
  render() {
    return (
      <div id="outerpane" className="container-fluid">
        <div className="h-80 row">
            <div id="video" className="h-100 col-8"></div>
            <div id="search" className="h-100 col"></div>
        </div>
        <div className="row h-20">
        </div>
      </div>
    )
  }
}
