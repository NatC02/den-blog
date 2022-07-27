import Link from "next/link";

export default function Custom404() {
  return (
    <main>
      <h1>404 - That page does not seem to exist...</h1>

      <iframe
        src="https://c.tenor.com/KOZLvzU0o4kAAAAC/no-results.gif"
        width="480"
        height="320"
        frameBorder="0"
        class="giphy-embed"
        allowFullScreen
      ></iframe>

      <Link href="/">
        <button className="btn-blue">Go home</button>
      </Link>
    </main>
  );
}
