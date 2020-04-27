var firebase = require('firebase/app');
require('firebase/firestore');
require('firebase/auth');

const firebaseConfig = {
  apiKey: `` + process.env.REACT_APP_YOUR_API_KEY,
  authDomain: `` + process.env.REACT_APP_YOUR_AUTH_DOMAIN,
  databaseURL: `` + process.env.REACT_APP_YOUR_DATABASE_URL,
  projectId: `` + process.env.REACT_APP_YOUR_PROJECTID,
  storageBucket: `` + process.env.REACT_APP_YOUR_STORAGEBUCKET,
  messagingSenderId: `` + process.env.REACT_APP_YOUR_MESSAGING_SENDER_ID,
  appId: `` + process.env.REACT_APP_YOUR_APP_ID,
  measurementId: `` + process.env.REACT_APP_YOUR_MEASUREMENT_ID
};

firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

module.exports = db;
