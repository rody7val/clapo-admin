import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';

import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

firebase.initializeApp({
    apiKey: "AIzaSyBo0p19cbGYHTH5GV6manLt8G96RTLM70U",
    authDomain: "clapo-admin.firebaseapp.com",
    databaseURL: "https://clapo-admin.firebaseio.com",
    projectId: "clapo-admin",
    storageBucket: "",
    messagingSenderId: "1051268691117"
  });

ReactDOM.render(
	<App />,
	document.getElementById('root')
);
registerServiceWorker();
