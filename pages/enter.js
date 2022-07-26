import { auth, googleAuthProvider } from '../lib/firebase';

export default function EnterPage({ }) {
  const user = null;
  const username = null;

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