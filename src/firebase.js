import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyBQQglDGXQeceyW_QPygNmxkdUY8SzbZNw",
    authDomain: "mcity-c352a.firebaseapp.com",
    databaseURL: "https://mcity-c352a.firebaseio.com",
    projectId: "mcity-c352a",
    storageBucket: "mcity-c352a.appspot.com",
    messagingSenderId: "285832196221",
    appId: "1:285832196221:web:3b99ef0553d78a0b"
};

firebase.initializeApp(firebaseConfig);

const firebaseData = firebase.database();
const firebaseMatches = firebaseData.ref('matches');

export {
    firebase,
    firebaseMatches
}