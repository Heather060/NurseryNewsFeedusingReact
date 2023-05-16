import React, { Component } from 'react';
import Comment from './comment';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLiked: false,
      likeCount: props.post.likes,
      commentContent: '',
      comments: props.post.comments,
    };
  }

  handleLike = () => {
    const { isLiked, likeCount } = this.state;

    if (isLiked) {
      this.setState({ likeCount: likeCount - 1, isLiked: false });
    } else {
      this.setState({ likeCount: likeCount + 1, isLiked: true });
    }
  };

  handleCommentChange = (event) => {
    this.setState({ commentContent: event.target.value });
  };

  handleCommentSubmit = (event) => {
    event.preventDefault();

    const { commentContent, comments } = this.state;

    if (commentContent.trim() !== '') {
      const newComment = {
        id: Date.now().toString(),
        author: 'Nursery Office',
        content: commentContent,
      };

      this.setState((prevState) => ({
        comments: [...prevState.comments, newComment],
        commentContent: '',
      }));
    }
  };

  render() {
    const { isLiked, likeCount, commentContent, comments } = this.state;
    const { post } = this.props;

    let imageUrl = null;
    if (post.image instanceof Blob) {
      imageUrl = URL.createObjectURL(post.image);
    }

    return (
      <div className="post">
        <div className="post-header">
          <img className="avatar" src="avatar.png" alt="Avatar" />
          <h3 className="author">{post.author}</h3>
          <p className="timestamp">{post.timestamp}</p>
        </div>
        <div className="post-content">
          <p>{post.content}</p>
          {imageUrl && <img src={imageUrl} alt="pictures" className="post-image" />}
        </div>  
        <div className="post-actions">
          <button className={`like-button ${isLiked ? 'liked' : ''}`} onClick={this.handleLike}>
            {isLiked ? 'Unlike' : 'Like'}
          </button>
          <span className="likes-count">{likeCount} {likeCount === 1 ? 'like' : 'likes'}</span>
        </div>
        <div className="post-comments">
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
        <form className="post-comment-form" onSubmit={this.handleCommentSubmit}>
          <input
            type="text"
            value={commentContent}
            onChange={this.handleCommentChange}
            placeholder="Write a comment..."
          />
          <button type="submit">Comment</button>
        </form>
      </div>
    );
  }
}

export default Post;
