import React, { Component } from 'react'
import './outer-pane.css';
import LeftPane from '../left-pane/left-pane';

export default class OuterPane extends Component {
  render() {
    return (
      <div id="outerpane" className="container-fluid">
        <div className="mt-5 h-80 row">
            <div id="video" className="h-100 col-8">
                <LeftPane />
            </div>
            <div id="search" className="h-100 col-4"></div>
        </div>
      </div>
    )
  }
}
