import React from 'react';
import videojs from 'video.js';
import './video-player.css';
import TweetCountGraph from '../tweet-count-graph/tweet-count-graph';
import VideoDescription from '../video-description/video-description';
import { Player, ControlBar } from 'video-react';
const sources = {
  sintelTrailer: 'http://media.w3.org/2010/05/sintel/trailer.mp4',
  bunnyTrailer: 'http://media.w3.org/2010/05/bunny/trailer.mp4',
  bunnyMovie: 'http://media.w3.org/2010/05/bunny/movie.mp4',
  test: 'http://media.w3.org/2010/05/video/movie_300.webm',
};

export default class VideoPlayer extends React.Component {

  state = {
    opacityclass: "op1",
    videoZindex: "z999",
    graphZindex: "z1",
  }

  contructor(props) {
    this.overlayRef = React.createRef();
  }
  componentDidMount() {
    this.player = videojs(this.videoNode, this.props,  () => {

    });
  }

  onMouseOver = () => {
    console.log("mouseover");
    this.setState({opacityclass: "op5"});
    this.setState({videoZindex: "z1"});
    this.setState({graphZindex: "z999"});
  }

  onMouseLeave = () => {
    console.log("mouseleave");
    this.setState({ opacityclass: "op1" });
    this.setState({videoZindex: "z999"});
    this.setState({graphZindex: "z1"});
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }

  updateCurrentTime = (time) => {
    this.player.currentTime(time);
  }

  pause = () => {
    this.setState({ opacityclass: "op5" });
    this.player.pause();
  }

  play = () => {
    this.setState({ opacityclass: "op5" });
    this.player.play();
  }

  graphPointSeek = (time) => {
    let timeInSeconds = time/(60);
    this.updateCurrentTime(timeInSeconds);
  }

  render() {


    return (
      <div>
        <div className={this.state.graphZindex + " overlay " + this.state.opacityclass}   onMouseLeave={this.onMouseLeave}>
          <TweetCountGraph graphPointSeek={this.graphPointSeek}/>
        </div>
        <div className={this.state.opacityclass + ' videoplayer ' + this.state.videoZindex}  onMouseEnter={this.onMouseOver}>
          <div data-vjs-player>
            <video ref={node => this.videoNode = node} className="video-js"></video>
          </div>
        </div>
        <VideoDescription listOfIntervals={this.props.listOfIntervals}/>

        {/* <button onClick={this.updateCurrentTime.bind(this,5)}>5</button> */}
        {/* <button onClick={this.updateCurrentTime.bind(this,3)}>3</button> */}
        {/* <button onClick={this.updateCurrentTime.bind(this,1)}>1</button> */}
        {/* <button onClick={this.pause}>pause</button>
        <button onClick={this.play}>play</button> */}

        
      </div>

    )
  }
}