import React, { Component } from 'react'
import './right-pane.css'
import Button from '../button/button'

export default class RightPane extends Component {

  constructor(props){
    super(props);
    let listOfButtonSelected = [];
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
      listOfButtonSelected.push(<Button key={tag} onTagSelect={this.props.onTagSelect} onTagUnselect={this.props.onTagUnselect} name={tag} addToListOfButton={this.addToListOfButton.bind(this)} buttonState="unselected"/>);
    }
    this.state = {
      listOfButton: listOfButtonSelected,
      listOfSearchedButton: []
    };
  }

  searchChange(event){
    let searchText = event.target.value;
    this.setState(() => {
      return {listOfSearchedButton: []};
    });
    if(searchText == "" ) return;
    for (let tag in this.props.tags){
      if(tag.startsWith(searchText)){
        this.setState((prevState) => {
          return {listOfSearchedButton: prevState.listOfSearchedButton.concat(<Button key={tag} onTagSelect={this.props.onTagSelect} onTagUnselect={this.props.onTagUnselect} name={tag} addToListOfButton={this.addToListOfButton.bind(this)} buttonState="unselected"/>)};
        });
      }
    }
  }

  addToListOfButton(tag){
    this.setState((prevState) => {
      // console.log(this.state.listOfButton);
      let found = false;

      for (let i=0;i<this.state.listOfButton.length;i++){
        if(this.state.listOfButton[i].key == tag){
          found = true;
          
          break;
        }
      }

      if(found){
        return {listOfButton: prevState.listOfButton}
      }
      else return {listOfButton: prevState.listOfButton.concat(<Button key={tag} onTagSelect={this.props.onTagSelect} onTagUnselect={this.props.onTagUnselect} name={tag} addToListOfButton={this.addToListOfButton.bind(this)} buttonState="selected"/>)};
    });
  }

  render() {
    return (
      <div className="col rightpane">
        <h4 className="tags">Tags</h4>
        <div id="custom-search-input">
            <div className="input-group col-md-12">
                <input type="text" className="form-control input-lg" placeholder="Search" onChange={(event) => {this.searchChange(event)}} />
            </div>
        </div>
        <div className='content-container'>
          {this.state.listOfSearchedButton}
        </div>
        <hr />
        <div className='content-container'>
          {this.state.listOfButton}
        </div>
      </div>
    )
  }
}
