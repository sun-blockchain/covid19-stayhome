var firebase = require('firebase/app');
require('firebase/firestore');
require('firebase/auth');

const firebaseConfig = {
  apiKey: `` + process.env.YOUR_API_KEY,
  authDomain: `` + process.env.YOUR_AUTH_DOMAIN,
  databaseURL: `` + process.env.YOUR_DATABASE_URL,
  projectId: `` + process.env.YOUR_PROJECTID,
  storageBucket: `` + process.env.YOUR_STORAGEBUCKET,
  messagingSenderId: `` + process.env.YOUR_MESSAGING_SENDER_ID,
  appId: `` + process.env.YOUR_APP_ID,
  measurementId: `` + process.env.YOUR_MEASUREMENT_ID
};

firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

module.exports = db;
