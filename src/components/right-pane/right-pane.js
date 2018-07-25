import React, { Component } from 'react'
import './right-pane.css'
import Button from '../button/button'

export default class RightPane extends Component {

  render() {
    let listOfButton = []

    let listOfKeywords = [];
    for (let tag in this.props.tags){
      let obj = this.props.tags[tag];
      let intervalsCount = obj.length;
      listOfKeywords.push([intervalsCount,tag]);
    }
    listOfKeywords.sort();
    listOfKeywords.reverse();
    console.log(listOfKeywords);
    for(let i=0;i< listOfKeywords.length && i<20 ;i++){
      let tag = listOfKeywords[i][1];
      listOfButton.push(<Button key={tag} onTagSelect={this.props.onTagSelect} onTagUnselect={this.props.onTagUnselect} name={tag}/>);
    }
    return (
      <div className="col rightpane">
        <h4 className="tags">Tags</h4>
        <hr />
        <div className='content-container'>
          {listOfButton}
        </div>
      </div>
    )
  }
}
