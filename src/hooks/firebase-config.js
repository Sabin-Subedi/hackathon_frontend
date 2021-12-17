const config = {
    apiKey: "AIzaSyDYAM9yo5fmDs3MyJNUzv_YtgMuH5mkSAI",
    authDomain: "hackathon-c6989.firebaseapp.com",
    projectId: "hackathon-c6989",
    storageBucket: "hackathon-c6989.appspot.com",
    messagingSenderId: "747205590937",
    appId: "1:747205590937:web:b4dbf5f0678d2cee4d9d08",
    measurementId: "G-BY9M86CVWC"
  };
  
  export function getFirebaseConfig() {
    if (!config || !config.apiKey) {
      throw new Error('No Firebase configuration object provided.' + '\n' +
      'Add your web app\'s configuration object to firebase-config.js');
    } else {
      return config;
    }
  }