var config = {
  apiKey: "*********************",
  authDomain: "*************************",
  databaseURL: "**********************",
  projectId: "*********",
  storageBucket: "***************",
  messagingSenderId: "***********"
};
firebase.initializeApp(config);

var fbRef = firebase.database().ref("data")
