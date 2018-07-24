import React, { Component } from 'react'

export default class Button extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <button type='button' className='btn btn-primary tag-button' style={{float: 'left', margin: '10px', borderRadius: '19px', border: '0px', backgroundImage: 'linear-gradient(99deg,#f74530,#ff2e73'}}>{this.props.name}</button>
        )
    }
}