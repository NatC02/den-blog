import styles from '../../styles/Admin.module.css';
import AuthCheck from '../../components/AuthCheck';
import { firestore, auth, serverTimestamp } from '../../lib/firebase';

import { useState } from 'react';
import { useRouter } from 'next/router';

import ImageUploader from '../../components/ImageUploader';

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

          <aside>
          <h3>Tools</h3>
          {/* change preview value to opposite of current state */}
            <button onClick={() => setPreview(!preview)}>{preview ? 'Edit' : 'Preview'}</button>
            <Link href={`/${post.username}/${post.slug}`}>
              <button className="btn-blue">Live view</button>
            </Link>
          </aside>
        </>
      )}
    </main>
  );
}

function PostForm({ defaultValues, postRef, preview }) {
  const { register, handleSubmit, reset, watch, formState, errors } = useForm({ defaultValues, mode: 'onChange' });

  // isDirty --> user has changed the form
  const { isValid, isDirty } = formState;

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

        <ImageUploader/>
        
        {/* include text area and validate with all of the other forms --> ref attribute */}
        <textarea name="content" ref={register({
            // properties with validation rules 
            maxLength: { value: 10000, message: 'content is too long' },
            minLength: { value: 10, message: 'content is too short' },
            required: { value: true, message: 'content is required'}
          })}>
      </textarea>
      
      {/*  */}
      {errors.content && <p className="text-danger">{errors.content.message}</p>}

        <fieldset>
          <input className={styles.checkbox} name="published" type="checkbox" ref={register} />
          <label>Published</label>
        </fieldset>

        <button type="submit" className="btn-green" disabled={!isDirty || !isValid}>
          Save Changes
        </button>
      </div>
    </form>
  );
}
