import UserProfile from '../../components/UserProfile';
import PostFeed from '../../components/PostFeed';
import { getUserWithUsername } from '../../lib/firebase';

export async function getServerSideProps({ query }) {
  const { username } = query;

  const userDoc = await getUserWithUsername(username);

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