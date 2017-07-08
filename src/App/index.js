import React, { Component } from 'react';
import firebase from 'firebase';
import moment from 'moment-with-locales-es6';
import { BrowserRouter as Router} from 'react-router-dom'

import Header from './Header';
import Main from './Main';
import FileUpload from './FileUpload';
import '../css/App.css';

moment.locale('es');

class App extends Component {
  constructor () {
    super();
    this.state = {
      user: null,

      collapsed: true,
      width: 0,
      height: 0
    };

    // auth
    this.handleAuth = this.handleAuth.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    // user
    this.refresh = this.refresh.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this)
    this.updateDimensions = this.updateDimensions.bind(this)

  }

  // Menu toggle
  toggleMenu() {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  // Actualizar estado react
  refresh () {
    //refresh user
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
    });
  }

  updateDimensions () {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  // Cuando se renderiza App en el DOM
  componentWillMount () {
    this.updateDimensions();
    this.refresh();
  }

  componentDidMount () {
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount () {
    window.removeEventListener("resize", this.updateDimensions);
  }

  // Login
  handleAuth () {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
      .then(result => console.log(`${result.user.email} ha iniciado sesión.`))
      .catch(error => console.log(`Error ${error.code}: ${error.message}`));
  }

  // Logout
  handleLogout () {
    firebase.auth().signOut()
      .then(result => console.log(`${result.user.email} ha salido.`))
      .catch(error => console.log(`Error ${error.code}: ${error.message}`));
  }

  // App
  render() {
    const { user } = this.props

    return (
      <div>
        <div className="App">
          <Router>
            <div>
              <Header
                user={this.state.user}
                collapsedMenu={this.toggleMenu}
                loginGoogle={this.handleAuth}
                logout={this.handleLogout}
                className="App-header" />

              <Main 
                user={this.state.user}

                resize={this.state.width}
                collapsed={this.state.collapsed}
                collapsedMenu={this.toggleMenu}/>
            </div>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
