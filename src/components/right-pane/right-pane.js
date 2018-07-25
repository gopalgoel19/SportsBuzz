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
      listOfKeywords.push({intervalsCount: intervalsCount,tag: tag});
    }

    listOfKeywords.sort((a,b) => {return b.intervalsCount - a.intervalsCount});
    
    for(let i=0;i< listOfKeywords.length && i<45 ;i++){
      let tag = listOfKeywords[i].tag;
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
