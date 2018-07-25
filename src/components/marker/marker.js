import React, { Component } from 'react';

export default class Marker extends Component{
    render() {
        const mLeftStart = this.props.start*3 + "px";
        const mLeftEnd = this.props.end*3 + "px";
        // console.log(mLfet);
        return(
            <div>
                <div style={{marginLeft: mLeftStart, border: '1px', background: 'yellow'}}>s</div>
                <div style={{marginLeft: mLeftEnd, border: '1px', background: 'red'}}>s</div>
            </div>
        )
    }
}