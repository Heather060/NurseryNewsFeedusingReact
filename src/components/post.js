import React, { useState } from 'react';
import Comment from './comment';

function Post({ post }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [commentContent, setCommentContent] = useState('');
  const [comments, setComments] = useState(post.comments);

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleCommentChange = (event) => {
    setCommentContent(event.target.value);
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();

    if (commentContent.trim() !== '') {
      const newComment = {
        id: Date.now().toString(),
        author: 'Nursery Office',
        content: commentContent,
      };

      setComments([...comments, newComment]);
      setCommentContent('');
    }
  };

  return (
    <div className="post">
      <div className="post-header">
        <img className="avatar" src="avatar.png" alt="Avatar" />
        <h3 className="author">{post.author}</h3>
        <p className="timestamp">{post.timestamp}</p>
      </div>
      <div className="post-content">
        <p>{post.content}</p>
      </div>
      <div className="post-actions">
        <button className={`like-button ${isLiked ? 'liked' : ''}`} onClick={handleLike}>
          {isLiked ? 'Unlike' : 'Like'}
        </button>
        <span className="likes-count">{likeCount} {likeCount === 1 ? 'like' : 'likes'}</span>
      </div>
      <div className="post-comments">
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
      <form className="post-comment-form" onSubmit={handleCommentSubmit}>
        <input
          type="text"
          value={commentContent}
          onChange={handleCommentChange}
          placeholder="Write a comment..."
        />
        <button type="submit">comment</button>
      </form>
    </div>
  );
}

export default Post;
