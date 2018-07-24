import React from 'react';
import videojs from 'video.js';
import './video-player.css';
export default class VideoPlayer extends React.Component {

  state = {
    opacityclass: "op1",
  }

  contructor(props) {
    this.overlayRef = React.createRef();
  }
  componentDidMount() {
    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
      //this.currentTime(_this.props.currentTime);
    });
  }

  onMouseOver = () => {
    console.log("mouseover");
    this.setState({opacityclass: "op5"});
  }

  onMouseLeave = () => {
    console.log("mouseleave");
    this.setState({ opacityclass: "op1" });
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

  render() {
    return (

      <div>
        <div className="overlay">
        
        </div>
        <div className={this.state.opacityclass} onMouseLeave={this.onMouseLeave} onMouseOver={this.onMouseOver}>
          <div data-vjs-player>
            <video ref={node => this.videoNode = node} className="video-js"></video>
          </div>
        </div>



        {/* <button onClick={this.updateCurrentTime.bind(this,5)}>5</button> */}
        {/* <button onClick={this.updateCurrentTime.bind(this,3)}>3</button> */}
        {/* <button onClick={this.updateCurrentTime.bind(this,1)}>1</button> */}
        {/* <button onClick={this.pause}>pause</button>
        <button onClick={this.play}>play</button> */}
      </div>

    )
  }
}