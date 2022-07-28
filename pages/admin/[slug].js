import styles from '../../styles/Admin.module.css';
import AuthCheck from '../../components/AuthCheck';
import { firestore, auth, serverTimestamp } from '../../lib/firebase';

import { useState } from 'react';
import { useRouter } from 'next/router';

import { useDocumentData, useDocumentDataOnce } from 'react-firebase-hooks/firestore';
// treat a form like react-hook state
import { useForm } from 'react-hook-form';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function AdminPostEdit(props) {
  return (
    <AuthCheck>
        <PostManager />
    </AuthCheck>
  );
}

function PostManager() {
  // toggle for previewing markdown
  const [preview, setPreview] = useState(false);

  const router = useRouter();
  const { slug } = router.query; // slug is the id of the post

  const postRef = firestore.collection('users').doc(auth.currentUser.uid).collection('posts').doc(slug);
  // listen to post data only when component is mounted
  const [post] = useDocumentDataOnce(postRef);

  return (
    <main className={styles.container}>
      {post && (
        // wnen post object is available, show the form
        <>
          <section>
            <h1>{post.title}</h1>
            <p>ID: {post.slug}</p>

            {/* Custom post form states to send to firestore */}
            <PostForm postRef={postRef} defaultValues={post} preview={preview} />
          </section>
        </>
      )}
    </main>
  );
}