import * as firebase from "firebase";

// Initialize Firebase
const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const twitterAuthProvider = new firebase.auth.TwitterAuthProvider();

const githubAuthProvider = new firebase.auth.GithubAuthProvider();
// firebase
//   .auth()
//   .signInWithPopup(githubAuthProvider)
//   .then(({ user }) => console.log(user))
//   .catch(err => console.log(err));

export {
  firebase,
  googleAuthProvider,
  twitterAuthProvider,
  githubAuthProvider,
  database as default
};

// database
//   .ref('test')
//   .push({
//     description: 'test expense',
//     amount: 500,
//     createdAt: 100,
//     note: 'expense note'
//   })
//   .then(ref => {
//     console.log(ref.key);
//     database
//       .ref(`test/${ref.key}`)
//       .remove()
//       .then(() => console.log('remove succeeded'))
//       .catch(() => console.log('remove failed'));
//   });

// database
//   .ref('test')
//   .push({
//     description: 'house rent',
//     amount: 5000,
//     createdAt: 90893892,
//     note: 'To rent'
//   })
//   .then(ref => {
//     database
//       .ref(`test/${ref.key}`)
//       .update({ note: 'Paid house rent' })
//       .then(() => console.log('updated'))
//       .catch(() => console.log('not updated'));
//   });

// // database
// //   .ref('expenses')
// //   .once('value')
// //   .then(snapshot => {
// //     const expenses = [];
// //     snapshot.forEach(childSnapshot => {
// //       expenses.push({
// //         id: childSnapshot.key,
// //         ...childSnapshot.val()
// //       });
// //     });
// //     console.log(expenses);
// //   });

// // database.ref('expenses').on('value', snapshot => {
// //   const expenses = [];
// //   snapshot.forEach(childSnapshot => {
// //     expenses.push({
// //       id: childSnapshot.key,
// //       ...childSnapshot.val()
// //     });
// //   });
// //   console.log(expenses);
// // });

// database.ref('expenses').on('child_removed', snapshot => {
//   console.log(snapshot.key, snapshot.val());
// });

// database.ref('expenses').on('child_changed', snapshot => {
//   console.log(snapshot.key, snapshot.val());
// });

// database.ref('expenses').on('child_added', snapshot => {
//   console.log(snapshot.key, snapshot.val());
// });
