import React, { Component } from 'react'
import './right-pane.css'
import Button from '../button/button'

export default class RightPane extends Component {

  constructor(props){
    super(props);
    
  }

  render() {
    const listOfButton = this.props.tags.map((tag) => <Button key={tag} name={tag}/>);
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
