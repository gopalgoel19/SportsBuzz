import React, { Component } from 'react'

export default class Button extends Component{
    constructor(props){
        super(props)
        this.state = {
            style: {margin: '10px', borderRadius: '19px', border: '0px', backgroundImage: 'linear-gradient(99deg,#f74530,#ff2e73'}
        }
    }
    selectButton(name,e){
        this.props.onClick(name);
        this.setState(()=>{
            return {style: {margin: '10px', borderRadius: '19px', border: '0px', backgroundImage: 'linear-gradient(99deg,#000000,#000000'}};
        });
    }
    render(){
        return(
            <button 
                type='button' 
                onClick={(e) => this.selectButton(this.props.name,e)}
                className='btn btn-secondary tag-button'
                style={this.state.style}
            >
            {this.props.name}
            </button>
        )
    }
}