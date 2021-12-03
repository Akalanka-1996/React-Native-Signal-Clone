import * as firebase from 'firebase'
import "firebase/firestore"
import "firebase/auth"


const firebaseConfig = {
 // firebase config
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
  firebase.firestore().settings({ experimentalForceLongPolling: true });
} else {
  app = firebase.app();
}

const db = app.firestore()
const auth = firebase.auth()

export { db, auth};
