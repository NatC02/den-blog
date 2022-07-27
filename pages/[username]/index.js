import UserProfile from '../../components/UserProfile';
import PostFeed from '../../components/PostFeed';
import { getUserWithUsername } from '../../lib/firebase';

export async function getServerSideProps({ query }) {
  const { username } = query;

  const userDoc = await getUserWithUsername(username);

  // JSON serializable data
  let user = null;
  let posts = null;

  if (userDoc) {
    user = userDoc.data();
    // make a query from the user document to get all posts
    const postsQuery = userDoc.ref
      .collection('posts')
      .where('published', '==', true)
      // most recent first
      .orderBy('createdAt', 'desc')
      .limit(5);
      // get the posts and map each document to document data
      // needs to be serializable
    posts = (await postsQuery.get()).docs.map(postToJSON);
  }

  return {
    props: { user, posts }, // these objects will be passed to the pages component (as props)
  };
}


export default function UserProfilePage({ user, posts }) {
  return (
    <main>
      <UserProfile user={user} />
      <PostFeed posts={posts} />
    </main>
  );
}