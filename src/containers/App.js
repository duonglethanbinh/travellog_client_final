import React, { Component } from 'react';
import './App.css';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import RouterURL from '../components/RouterURL/RouterURL';
import { BrowserRouter as Router } from "react-router-dom";
class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <RouterURL></RouterURL>
        <Footer />
      </Router>
    )
  }
}

export default App;
