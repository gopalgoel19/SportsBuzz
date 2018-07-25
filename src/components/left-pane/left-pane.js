import React, { Component } from 'react'
import VideoPlayer from '../video-player/video-player';
import './left-pane.css';


const  videoJsOptions = {
  
}
export default class LeftPane extends Component {
  constructor(props){
    super(props);

    this.state = {
      autoplay: true,
      controls: true,
      "inactivityTimeout": 0,
      height:400,
      sources: [{
        src: 'http://vjs.zencdn.net/v/oceans.mp4',
        type: 'video/mp4'
      }]
    }
  }

  componentDidMount() {
    console.log("in left pane", this.props.markers);
    
  }
  render() {
    
    return (
      <div className="col-12 height550">
        <VideoPlayer tags={this.props.tags} {...this.state} currentTime={this.props.currentTime} staticMarkers={this.props.staticMarkers} listOfIntervals={this.props.listOfIntervals}/>
      </div>
    )
  }
}
