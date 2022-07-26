import Link from 'next/link';

// navbar
export default function Navbar() {
//   temp state to be updates with auth state from firestore
  const user = null;
  const username = null;

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