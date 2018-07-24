import React, { Component } from 'react';
import Header from './components/header/header';
import './App.css';
import OuterPane from './components/outer-pane/outer-pane';

class App extends Component {
  render() {
    return (
      <div className="width-60 container-fluid">
        <Header />
        <OuterPane />
      </div>
    );
  }
}

export default App;
