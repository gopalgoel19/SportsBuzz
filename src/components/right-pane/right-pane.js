import React, { Component } from 'react'
import './right-pane.css'
import Button from '../button/button'

export default class RightPane extends Component {

  render() {
    let listOfButton = []
    // const listOfButton = this.props.tags.map((tag) => <Button key={tag} onClick={this.props.onTagCllick} name={tag}/>);
    for(let tag in this.props.tags){
      listOfButton.push(<Button key={tag} onClick={this.props.onTagClick} name={tag}/>);
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
