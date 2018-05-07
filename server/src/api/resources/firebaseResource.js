import * as firebase from "firebase";
import "firebase/auth";
export default function(app) {
  // Initialize Firebase
  var config = {
    apiKey: app.get("FIREBASE_API_KEY"),
    authDomain: app.get("FIREBASE_AUTH_DOMAIN"),
    databaseURL: app.get("FIREBASE_DB_URL"),
    projectId: app.get("FIREBASE_PROJECT_ID"),
    storageBucket: app.get("FIREBASE_STORAGE_BUCKET"),
    messagingSenderId: app.get("FIREBASE_MESS_SENDID")
  };
  const firebaseApp = firebase.initializeApp(config);
  // const firebaseAuth = firebaseApp.auth();

  const firebaseDB = firebase.database();

  return {
    getUsers: () => {
      return new Promise(resolve => {
        firebaseDB
          .ref("/users")
          .once("value")
          .then(snapshot => {
            const userList = [];
            const users = snapshot.val();

            Object.keys(users).forEach(id =>
              userList.push({ ...users[id], id })
            );

            resolve(userList);
          })
          .catch(error => console.log(error));
      });
    },
    getUser: id => {
      return new Promise(resolve => {
        firebaseDB
          .ref(`/users/${id}/`)
          .once("value")
          .then(snapshot => {
            resolve({
              ...snapshot.val(),
              id
            });
          })
          .catch(error => console.log(error));
      });
    }
  };
}
