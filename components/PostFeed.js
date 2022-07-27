import Link from 'next/link';

function PostItem({ post, admin = false }) {
  // Naive method to calc word count in each post and the read time
  const wordCount = post?.content.trim().split(/\s+/g).length;
  const minutesToRead = (wordCount / 100 + 1).toFixed(0);

  return (
    
  );
}