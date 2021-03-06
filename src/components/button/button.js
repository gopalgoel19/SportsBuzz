import React, { Component } from 'react'

export default class Button extends Component{
    
    constructor(props){
        super(props)
        this.state = {
            buttonStyle: {
                "selected": {margin: '10px', borderRadius: '19px', border: '0px', backgroundImage: 'linear-gradient(99deg,#000000,#000000'},
                "unselected": {margin: '10px', borderRadius: '19px', border: '0px', backgroundImage: 'linear-gradient(99deg,#f74530,#ff2e73'}
            }
        }
    }
    selectButton(name,e){
        this.props.handleButtonClick(name);
        if(this.props.buttonState === "unselected"){
            this.props.onTagSelect(name);
        }
        else{
            this.props.onTagUnselect(name);
        }
    }
    render(){
        return(
            <button 
                type='button' 
                onClick={(e) => this.selectButton(this.props.name,e)}
                className='btn btn-secondary tag-button'
                style={this.state.buttonStyle[this.props.buttonState]}
            >
            {this.props.name}
            </button>
        )
    }
}