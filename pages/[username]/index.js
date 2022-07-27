import UserProfile from '../../components/UserProfile';
import PostFeed from '../../components/PostFeed';



export default function UserProfilePage({ user, posts }) {
  return (
    <main>
      <UserProfile user={user} />
      <PostFeed posts={posts} />
    </main>
  );
}