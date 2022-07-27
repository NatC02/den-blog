import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import toast from "react-hot-toast";

// # of posts to grab for each paginated batch on firebase
// its the max # of posts to query per page
const LIMIT = 1;

export async function getServerSideProps(context) {
  const postsQuery = firestore
    // get collection no matter where it is located, it could be after a user's uid
    .collectionGroup("posts")
    .where("published", "==", true)
    .orderBy("createdAt", "desc")
    .limit(LIMIT);

  const posts = (await postsQuery.get()).docs.map(postToJSON);

  return {
    props: { posts }, // will be passed to the page component as props
  };
}

export default function Home(props) {
  const [posts, setPosts] = useState(props.posts);
  const [loading, setLoading] = useState(false);

  const [postsEnd, setPostsEnd] = useState(false);

  return (
    <main>
      <PostFeed posts={posts} />

      {!loading && !postsEnd && (
        <button onClick={getMorePosts}>Load more</button>
      )}

      <Loader show={loading} />

      {postsEnd && "You have reached the end!"}
    </main>
  );
}
