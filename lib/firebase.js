// bundle these sdks in our build so they are sent down to the client

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  // den-blog Firebase configuration
};

// You can only init once, but Next in dev avoids this issue
// If the initializeApp method is called more than once, it will throw an error

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export const firestore = firebase.firestore();

// firebase event, progress of file upload, Storage exports
export const storage = firebase.storage();
export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED

// special way to update firestore document
// this was I can update the document without having to actually know the count of the document
export const increment = sirebase.firestore.FieldValue.increment();

// Helper functions

/**`
 * Gets a users/{uid} document with username
 * @param  {string} username
 */
 export async function getUserWithUsername(username) {
  const usersRef = firestore.collection('users');
  const query = usersRef.where('username', '==', username).limit(1);
  const userDoc = (await query.get()).docs[0];
  return userDoc;
}



/**'
 * Converts a firestore document to millisecond-precise (cant be JSON)
 * @param  {DocumentSnapshot} doc
 */
 export function postToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    // convert any fields not serializable to millisecond-precise
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis(),
  };
}


export const fromMillis = firebase.firestore.Timestamp.fromMillis;

// create a universal timestamp using firestore's serverTimestamp
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;

;