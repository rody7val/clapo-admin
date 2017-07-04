import React, { Component } from 'react';
import firebase from 'firebase';
import moment from 'moment-with-locales-es6';

import Header from './Header';
import FileUpload from './FileUpload';
import '../css/App.css';

moment.locale('es');

class App extends Component {
  constructor () {
    super();
    this.state = {
      user: null,
      uploadValue: 0,
      pictures: []
    };

    // auth
    this.handleAuth = this.handleAuth.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    // files
    this.handleUpload = this.handleUpload.bind(this);
    // debug
    // this.renderJSON = this.renderJSON.bind(this);
    // user
    this.refresh = this.refresh.bind(this);
    this.setPictures = this.setPictures.bind(this);
    this.resetPictures = this.resetPictures.bind(this);

  }

  // Actualizar estado react
  refresh () {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
      this.setPictures();
    });
  }

  // Modificar pictures
  setPictures () {
    if (this.state.user) {
      firebase.database().ref('pictures').on('child_added', snapshot => {
        this.setState({
          pictures: this.state.pictures.concat(snapshot.val())
        });
      });
    } else {
      this.resetPictures();
    }
  }

  // Reset pictures
  resetPictures () {
    this.setState({ pictures: [] });
  }

  // Cuando se renderiza App en el DOM
  componentWillMount () {
    this.refresh();
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

  // Subir imagen
  handleUpload (event) {
    // storage
    const file = event.target.files[0];
    const storageRef = firebase.storage().ref(`/fotos/${file.name}`);
    const task = storageRef.put(file);

    task.on('state_changed', snapshot => {
      let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      this.setState({
        uploadValue: percentage
      });
    }, error => {
      console.log(error.message)
    }, () => {
      const record = {
        photoURL: this.state.user.photoURL,
        displayName: this.state.user.displayName,
        image: task.snapshot.downloadURL,
        created: moment().valueOf()
      };

      // database
      const dbRef = firebase.database().ref('pictures');
      const newPicture = dbRef.push();
      newPicture.set(record);
    });
  }

  // Debug
  // renderJSON () {
  //   return (
  //     <pre>
  //       user = {JSON.stringify(this.state.user, null, 2)}
  //       <br/>
  //       <hr/>
  //       pictures = {JSON.stringify(this.state.pictures, null, 2)}
  //     </pre>
  //   )
  // }

  // App
  render() {
    return (
      <div>
        <div className="App red">
          <Header
            user={this.state.user}
            loginGoogle={this.handleAuth}
            logout={this.handleLogout}
            className="App-header" />
        </div>
      </div>
    );
  }
}
        // <div>
        //   { this.renderJSON() }
        // </div>

export default App;
