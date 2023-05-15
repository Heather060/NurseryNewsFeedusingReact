// import React from 'react';
// import Post from './post';

// function Feed() {
//   const posts = [
//     {
//         id: 1,
//         author: 'Nursery Office',
//         content: 'talking talking tlaking',
//         timestamp: '20 mins ago',
//         likes: 10,
//         comments: []
//       },
//       {
//         id: 2,
//         author: 'Nursery Office',
//         content: 'bla bla bla bla',
//         timestamp: '40 mins ago',
//         likes: 5,
//         comments: []
//       },
//   ];

//   return (
//     <div className="feed">
//       {posts.map((post) => (
//         <Post key={post.id} post={post} />
//       ))}
//     </div>
//   );
// }

// export default Feed;

import React, { useState, useEffect } from 'react';
import Post from './post';

function Feed() {
  const [posts, setPosts] = useState([]);
  const [postContent, setPostContent] = useState('');

  useEffect(() => {
    const storedPosts = localStorage.getItem('posts');
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  const handlePostChange = (event) => {
    setPostContent(event.target.value);
  };

  const handlePostSubmit = (event) => {
    event.preventDefault();

    if (postContent.trim() !== '') {
      const newPost = {
        id: Date.now().toString(),
        author: 'Nursery Office',
        content: postContent,
        likes: 0,
        comments: [],
      };

      setPosts([...posts, newPost]);
      setPostContent('');
    }
  };

  return (
    <div className="feed">
      <h1>Create New Post</h1>
      <form className="post-form" onSubmit={handlePostSubmit}>
        <textarea
          value={postContent}
          onChange={handlePostChange}
          placeholder="Write a new post..."
        ></textarea>
        <button type="submit">Post</button>
      </form>
      <div className="post-list">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Feed;
