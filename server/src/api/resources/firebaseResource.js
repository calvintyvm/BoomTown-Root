import * as firebase from "firebase";

export default function(app) {
  firebase.initializeApp({
    apiKey: "AIzaSyAmRK7Dryl0fMWBEA3-q0odFK8A6Ct7Skw",
    authDomain: "boomtown-c8fa1.firebaseapp.com",
    databaseURL: "https://boomtown-c8fa1.firebaseio.com"
  });
  console.log(app.get("FIREBASE_DB_URL"));
  const FirebaseDB = firebase.database();

  return {
    getUsers: () =>
      new Promise(resolve => {
        FirebaseDB.ref("/users")
          .once("value")
          .then(snapshot => {
            const userList = [];
            const users = snapshot.val();

            Object.keys(users).forEach(id =>
              userList.push({
                ...users[id],
                id
              })
            );
            resolve(userList);
          })
          .catch(error => console.log(error));
      }),
    getUser: id =>
      new Promise(resolve => {
        FirebaseDB.ref(`/users/${id}`)
          .once("value")
          .then(snapshot => {
            resolve({
              ...snapshot.val(),
              id
            });
          })
          .catch(error => console.log(error));
      })
  };
}
