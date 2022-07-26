// bundle these sdks in our build so they are sent down to the client

import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    // den-blog Firebase configuration
};
  
// You can only init once, but Next in dev avoids this issue
// If the initializeApp method is called more than once, it will throw an error

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();