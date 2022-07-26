import { auth, googleAuthProvider } from '../lib/firebase';

import { useContext } from 'react';
import { UserContext } from '../lib/context';

export default function EnterPage({ }) {

  const { user, username } = useContext(UserContext)

  // 1. user signed out displaying <SignInButton />
  // 2. user signed in, but missing username, then <UsernameForm />
  // 3. user signed in, has username displaying <SignOutButton />
  return (
    <main>
      {/* ternary operator for UI logic based on username state */}
      {user ? 
        !username ? <UsernameForm /> : <SignOutButton /> 
        : 
        <SignInButton />
      }
    </main>
  );
}

// Sign in with Google button
function SignInButton() {
  const signInWithGoogle = async () => {
    try {
      await auth.signInWithPopup(googleAuthProvider);
      } catch (err) {
      console.log(err);
      }
  };

  return (
    <button className="btn-google" onClick={signInWithGoogle}>
      <img src={'/google.png'} /> Sign in with Google
    </button>
  );
}

// Sign out button
function SignOutButton() {
  return <button onClick={() => auth.signOut()}>Sign Out</button>;
}

function UsernameForm() {
  return null;
}
