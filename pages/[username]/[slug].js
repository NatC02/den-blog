import styles from '../../styles/Post.module.css';
import PostContent from '../../components/PostContent';
import { firestore, getUserWithUsername, postToJSON } from '../../lib/firebase';
import { useDocumentData } from 'react-firebase-hooks/firestore';

// fetch data at build time to pre-render the page (caching) 
export async function getStaticProps({ params }) {
  // get user with username from url params
  const { username, slug } = params;
  // get user from user document in firestore
  const userDoc = await getUserWithUsername(username);

  let post;
  let path;

  if (userDoc) {
    // Make reference to username with slug as ID
    const postRef = userDoc.ref.collection('posts').doc(slug);
    // convert to JSON
    post = postToJSON(await postRef.get());

    // prop as path to re-fetch on the client-side to rehydrate
    path = postRef.path;
  }

  return {
    props: { post, path },
    // regenrate the page every (time) seconds
    revalidate: 5000,
  };
}

export async function getStaticPaths() {
  // query all posts in firestore
  const snapshot = await firestore.collectionGroup('posts').get();

  // map each post to a path
  const paths = snapshot.docs.map((doc) => {
    const { slug, username } = doc.data();
    return {
      params: { username, slug },
    };
  });

  return {
    // This is the only accepted format:
    // paths: [
    //   { params: { username, slug }}
    // ],
    paths,
    // when user reaches a page that doesn't exist, then use next's server-side fallback 
    fallback: 'blocking',
  };
}

export default function Post(props) {

  return (
    <main className={styles.container}>

    </main>
  );
}