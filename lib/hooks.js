import { auth, firestore } from '../lib/firebase';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

// Custom hook to read  auth record and user profile doc
export function useUserData() {
    const [user] = useAuthState(auth);
    const [username, setUsername] = useState(null);
  
    useEffect(() => {
      // turn off realtime subscription
      let unsubscribe;

    //  read current firebase user, then use the uid to fetch the public profile 
    //  document from firestore
      if (user) {
        const ref = firestore.collection('users').doc(user.uid);
        unsubscribe = ref.onSnapshot((doc) => {
          setUsername(doc.data()?.username);
        });
      } else {
        setUsername(null);
      }
  
      return unsubscribe;
    }, [user]);
  
    return { user, username };
  }