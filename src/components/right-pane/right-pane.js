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
      let name = listOfKeywords[i][1];
      let obj = {
        tag: name,
        style: "unselected"
      }
      listOfButtonSelected.push(obj);
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
          let obj = {
            tag: tag,
            style: "unselected"
          }
          return {listOfSearchedButton: prevState.listOfSearchedButton.concat(obj)};
        });
      }
    }
  }


  handleButtonClick(name){
    let obj1 = {
      tag: name,
      style: "unselected"
    };
    let obj2 = {
      tag: name,
      style: "selected"
    };
    let found = false;
    let oldList = this.state.listOfButton;
    for (let i=0;i<this.state.listOfButton.length;i++){
        if(this.state.listOfButton[i].tag == name){
          let btnStyle = this.state.listOfButton[i].style;
          oldList.splice(i,1);
          found=true;
          obj2 = {
            tag: name,
            style: btnStyle == "selected" ? "unselected" : "selected"
          }
      }
    }
    this.setState((prevState)=>{
        return { listOfButton: prevState.listOfButton.concat(obj2) };
    });
  }

  render() {
    let listOfButtonComponents = this.state.listOfButton.map((obj) => {
      return <Button key={obj.tag} onTagSelect={this.props.onTagSelect} onTagUnselect={this.props.onTagUnselect} name={obj.tag} handleButtonClick={this.handleButtonClick.bind(this)} buttonState={obj.style}/>
    });
    let listOfSearchedButtonComponents = this.state.listOfSearchedButton.map((obj) => {
      return <Button key={obj.tag} onTagSelect={this.props.onTagSelect} onTagUnselect={this.props.onTagUnselect} name={obj.tag} handleButtonClick={this.handleButtonClick.bind(this)} buttonState={obj.style}/>
    });
    return (
      <div className="col rightpane">
        <h4 className="tags">Tags</h4>
        <div id="custom-search-input">
            <div className="input-group col-md-12">
                <input type="text" className="form-control input-lg" placeholder="Search" onChange={(event) => {this.searchChange(event)}} />
            </div>
        </div>
        <div className='content-container'>
          {listOfSearchedButtonComponents}
        </div>
        <hr />
        <div className='content-container'>
          {listOfButtonComponents}
        </div>
      </div>
    )
  }
}
