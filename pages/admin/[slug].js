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

function PostForm({ defaultValues, postRef, preview }) {
  const { register, handleSubmit, reset, watch } = useForm({ defaultValues, mode: 'onChange' });

  const updatePost = async ({ content, published }) => {
    // get content, published from form and update post to firestore
    await postRef.update({
      content,
      published,
      updatedAt: serverTimestamp(),
    });

    // this resets the validation state
    reset({ content, published });

    toast.success('Post updated successfully!')
  };

  return (
    // handle submit for easier submit by not explicitly declaring preventDefault()
    <form onSubmit={handleSubmit(updatePost)}>
      {preview && (
        <div className="card">
          {/* watch function treats preview like state to update whenever the form changes */}
          <ReactMarkdown>{watch('content')}</ReactMarkdown>
        </div>
      )}

      <div className={preview ? styles.hidden : styles.controls}>
        
        {/* include text area and validate with all of the other forms --> ref attribute */}
        <textarea name="content" ref={register}></textarea>

        <fieldset>
          <input className={styles.checkbox} name="published" type="checkbox" ref={register} />
          <label>Published</label>
        </fieldset>

        <button type="submit" className="btn-green">
          Save Changes
        </button>
      </div>
    </form>
  );
}
