import * as firebase from 'firebase';
import 'firebase/auth';

const config = {
    apiKey: 'AIzaSyAmRK7Dryl0fMWBEA3-q0odFK8A6Ct7Skw',
    authDomain: 'boomtown-c8fa1.firebaseapp.com',
    databaseURL: 'https://boomtown-c8fa1.firebaseio.com',
    projectId: 'boomtown-c8fa1',
    storageBucket: 'boomtown-c8fa1.appspot.com',
    messagingSenderId: '801644784464'
};

const firebaseApp = firebase.initializeApp(config);
const firebaseAuth = firebaseApp.auth();

export { firebaseApp, firebaseAuth };
