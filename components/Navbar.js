import Link from 'next/link';

// navbar
export default function Navbar() {
//   temp state to be updates with auth state from firebase
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
    </ul>
  </nav>
  );
}