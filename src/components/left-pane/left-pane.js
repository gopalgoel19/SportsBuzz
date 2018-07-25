import React, { Component } from 'react'
import VideoPlayer from '../video-player/video-player';
import VideoDescription from '../video-description/video-description';
import './left-pane.css';
import TweetCountGraph from '../tweet-count-graph/tweet-count-graph';

const  videoJsOptions = {
  
}
export default class LeftPane extends Component {
  constructor(props){
    super(props);
    this.state = {
      autoplay: true,
      controls: true,
      height:400,
      sources: [{
        src: 'http://vjs.zencdn.net/v/oceans.mp4',
        type: 'video/mp4'
      }]
    }
  }

  componentDidMount() {
    videoJsOptions['currentTime'] = this.props.timeStart;
  }
  render() {
    // console.log(this.props.listOfIntervals);
    return (
      <div className="col-8 height550">
        <VideoPlayer {...this.state} currentTime={this.props.currentTime} listOfIntervals={this.props.listOfIntervals}/>
      </div>
    )
  }
}
