import React from 'react';
import videojs from 'video.js';
import './video-player.css';
import TweetCountGraph from '../tweet-count-graph/tweet-count-graph';
import VideoDescription from '../video-description/video-description';
import 'videojs-markers';
import RightPane from '../right-pane/right-pane';

export default class VideoPlayer extends React.Component {

  state = {
    opacityclass: "op1",
    videoZindex: "z999",
    graphZindex: "z1",
    listOfIntervals: [],
    currentTagSelected: [],
  }

  contructor(props) {
    this.overlayRef = React.createRef();
  }

  componentDidMount() {
    this.player = videojs(this.videoNode, this.props, () => {

    });

    console.log("markers", this.state.markers);

    this.player.markers({
      markerStyle: {
        'width': '8px',
        'background-color': 'none',
        'margin-bottom': '4px'
      },
      markerTip: {
        display: true,
        text: function (marker) {
          return marker.text;
        },
        time: function (marker) {
          return marker.time;
        }
      },
      markers: this.props.staticMarkers
    });

  }

  onMouseOver = () => {
    this.setState({ opacityclass: "op5" });
    this.setState({ videoZindex: "z1" });
    this.setState({ graphZindex: "z999" });
  }

  onMouseLeave = () => {
    this.setState({ opacityclass: "op1" });
    this.setState({ videoZindex: "z999" });
    this.setState({ graphZindex: "z1" });
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }

  updateCurrentTime = (time) => {
    this.player.currentTime(time);
  }

  graphPointSeek = (time) => {
    let timeInSeconds = time / (60);
    this.updateCurrentTime(timeInSeconds);
  }

  updateMarkers = () => {
    let markerEvents = [];

    console.log("In after update", this.state.listOfIntervals);

    for (let i = 0; i < this.state.listOfIntervals.length; i++) {
      let obj = {};
      obj['time'] = this.state.listOfIntervals[i].startTime;
      obj['text'] = "event";
      obj['class'] = "fas fa-star orange"
      console.log(obj);

      markerEvents.push(obj);
    }

    markerEvents.push(...this.props.staticMarkers);

    this.player.markers.removeAll();
    this.player.markers.add(markerEvents);
  }

  onTagSelect(TagName) {
    this.setState((prevState) => {
      let newSetOfIntervals = prevState.listOfIntervals.concat(this.mergedIntervals(this.props.tags[TagName]));
      let merged = this.mergedIntervals(newSetOfIntervals);
      prevState.currentTagSelected.push(TagName);
      return { listOfIntervals: merged, currentTagSelected: prevState.currentTagSelected }
    }, () => {
      this.updateMarkers();
    });
  }
  
  onTagUnselect(TagName) {
    console.log("keyword unselected: " + TagName);
    this.setState((prevState) => {
      console.log("Current selected");
      console.log(prevState.currentTagSelected);


      let index = prevState.currentTagSelected.indexOf(TagName);
      if (index > -1) {
        prevState.currentTagSelected.splice(index, 1);
      }
      console.log("Current selected after removing");
      console.log(prevState.currentTagSelected);

      let newSetOfIntervals = this.calculateIntervals(prevState.currentTagSelected);
      console.log("Calculated after removing");
      console.log(newSetOfIntervals);


      return { currentTagSelected: prevState.currentTagSelected, listOfIntervals: newSetOfIntervals };
    }, () => {
      this.updateMarkers();
    })
  }

  calculateIntervals(tagArr) {
    let intervals = [];

    for (let i = 0; i < tagArr.length; i++) {
      intervals.push(...this.props.tags[tagArr[i]]);
    }

    console.log("Calculating again");
    console.log(intervals);
    return this.mergedIntervals(intervals);
  }

  mergedIntervals(intervals) {
    if (intervals.length <= 1)
      return intervals;

    var stack = [];
    var top = null;

    intervals = intervals.sort((a, b) => { return a.startTime - b.startTime });


    stack.push(intervals[0]);


    for (var i = 1; i < intervals.length; i++) {

      top = stack[stack.length - 1];


      if (top.endTime < intervals[i].startTime) {
        stack.push(intervals[i]);
      }

      else if (top.endTime < intervals[i].endTime) {
        top = intervals[i];
        stack.pop();
        stack.push(top);
      }
    }
    console.log(stack);

    return stack;

  }


  render() {


    for (var i = 1; i < intervals.length; i++) {

      top = stack[stack.length - 1];


      if (top.endTime < intervals[i].startTime) {
        stack.push(intervals[i]);
      }

      else if (top.endTime < intervals[i].endTime) {
        top = intervals[i];
        stack.pop();
        stack.push(top);
      }
    }
    console.log(stack);
    
    return stack;

  }
 

  render() {

    
    return (
      <div className="row">
        <div className="col-8">
          <div className={this.state.graphZindex + " overlay " + this.state.opacityclass} onMouseLeave={this.onMouseLeave}>
            <TweetCountGraph graphPointSeek={this.graphPointSeek} />
          </div>

          <div className={this.state.opacityclass + ' videoplayer ' + this.state.videoZindex} onMouseEnter={this.onMouseOver}>
            <div data-vjs-player>
              <video ref={node => this.videoNode = node} className="video-js"></video>
            </div>
          </div>

          <VideoDescription />
        </div>

        <div className="col-4">
          <RightPane tags={this.props.tags} onTagSelect={this.onTagSelect.bind(this)} onTagUnselect={this.onTagUnselect.bind(this)} />
        </div>
      </div>

    )
  }
}