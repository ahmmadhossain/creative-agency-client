import * as firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC7PcDPmA9CfeNo-PeCD6_KBqaznVtcoFw",
  authDomain: "my-creative-agency.firebaseapp.com",
  databaseURL: "https://my-creative-agency.firebaseio.com",
  projectId: "my-creative-agency",
  storageBucket: "my-creative-agency.appspot.com",
  messagingSenderId: "761900455549",
  appId: "1:761900455549:web:fa72dc1091272b313e0314"
};

firebase.initializeApp(firebaseConfig);

export default firebase;