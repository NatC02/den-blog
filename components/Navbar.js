import Link from 'next/link';

import { useContext } from 'react';
import { UserContext } from '../lib/context';

// navbar
export default function Navbar() {

  // UI will re-render automatically when user state changes
const { user, username } = useContext(UserContext)

  return (
    <nav className="navbar">
    <ul>
      <li>
        <Link href="/">
          <button className="btn-logo">ALL POSTS</button>
        </Link>
      </li>

      {/* user is signed-in and has username */}
      {username && (
        <>
          <li className="push-left">
            <Link href="/admin">
              <button className="btn-blue">Write Posts</button>
            </Link>
          </li>
          <li>
            {/* string interpolation for username for redirect */}
            <Link href={`/${username}`}>
              <img src={user?.photoURL} />
            </Link>
          </li>
        </>
      )}


      {/* user is not signed OR has not created username */}
      {!username && (
        <li>
          <Link href="/enter">
            <button className="btn-blue">Log in</button>
          </Link>
        </li>
      )}
    </ul>
  </nav>
  );
}