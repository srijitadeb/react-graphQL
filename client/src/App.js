import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route } from 'react-router-dom';
//import Courses from './Courses';
import './App.css';
import Launches from './Components/Launches';
import Launch from './Components/Launch';

const client = new ApolloClient({
  //uri: '/graphql'
  uri:'http://localhost:4000/graphql'
})


class App extends Component {
  render() {
    return (
      <ApolloProvider client ={client}>
        <Router>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <h4 className="text-center">Launches</h4>
            {/* <div className="collapse navbar-collapse" id="navbarColor02">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Features</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Pricing</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">About</a>
                </li>
              </ul>
            </div> */}
          </nav>
          <Route exact path='/' component = {Launches} />
          <Route exact path='/launch/:flight_number' component = {Launch} />
        </Router>
      </ApolloProvider>
    )
  }
}

export default App;
