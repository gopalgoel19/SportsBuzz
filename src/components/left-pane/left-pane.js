import React, { Component } from 'react'
import VideoPlayer from '../video-player/video-player';
import VideoDescription from '../video-description/video-description';
import './left-pane.css';

const  videoJsOptions = {
  
}
export default class LeftPane extends Component {
  state = {
    autoplay: false,
    controls: true,
    height:400,
    sources: [{
      src: 'http://vjs.zencdn.net/v/oceans.mp4',
      type: 'video/mp4'
    }]
  }

  componentDidMount() {
    videoJsOptions['currentTime'] = this.props.timeStart;
  }
  render() {
    return (
      <div className="col-8 height550">
        <VideoPlayer {...this.state} currentTime={this.props.currentTime}/>
        <VideoDescription />
      </div>
    )
  }
}
