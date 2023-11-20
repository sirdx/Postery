import { useEffect, useState } from 'react';
import { getPosts } from 'src/api/Post';

export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const response = await getPosts();
      setPosts(response);
    }

    fetchPosts();
  }, []);

  return (
    <>
      <h1>Posts</h1>

      {posts.map(post =>
        <div key={post.id}>
          {post.title}<br />
          {post.content}<br />
          {post.author}
        </div>  
      )}
    </>
  );
}