import React, { Component } from 'react'
// import graphData from './../../mock data/graph-data.json';
import  CanvasJSReact from './../../lib/canvasjs.react';
import graphData from './../../mock data/graphplot.json';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
export default class TweetCountGraph extends Component {

  componentDidMount() {
      console.log(graphData);
  }

  render() {
    const options = {
        animationEnabled: true,
        width:960,
        height:370,
        title: {
        },
        axisY: {
            includeZero: false,
            valueFormatString:" "
        },
        axisX: {
            valueFormatString:" "
        },
        data: [{
            click:  (e) => {
                this.props.graphPointSeek(e.dataPoint.x);
            },
            type: "splineArea",
            showInLegend: false,
            dataPoints: graphData
        }]
    }
    return (
    <div>
        <CanvasJSChart options = {options}
            /* onRef={ref => this.chart = ref} */
        />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
    </div>
    );
  }
}
