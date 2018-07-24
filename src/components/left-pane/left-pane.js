import React, { Component } from 'react'
import VideoPlayer from '../video-player/video-player';

const videoJsOptions = {
  autoplay: false,
  controls: true,
  sources: [{
    src: 'http://vjs.zencdn.net/v/oceans.mp4',
    type: 'video/mp4'
  }]
}

export default class LeftPane extends Component {
  render() {
    return (
      <div>
        <VideoPlayer {...videoJsOptions}/>
      </div>
    )
  }
}
