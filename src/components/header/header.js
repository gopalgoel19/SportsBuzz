import React, { Component } from 'react'
import logo from '../../world-cup.png';
import './header.css';
export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand" href=" ">
          <img src={logo} width="30" height="30" className="mr-10 d-inline-block align-top" alt="" />
          SportsBuzz
        </a>
        {/* <form className="form-inline">
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form> */}
      </nav>
    )
  }
}
