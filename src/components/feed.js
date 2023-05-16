import React, { Component } from 'react';
import Post from './post';

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      postContent: '',
      postImage: null,
      isPostValid: false,
    };
  }

  componentDidMount() {
    const storedPosts = localStorage.getItem('posts');
    if (storedPosts) {
      this.setState({ posts: JSON.parse(storedPosts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.posts !== this.state.posts) {
      localStorage.setItem('posts', JSON.stringify(this.state.posts));
    }
  }

  handlePostChange = (event) => {
    const postContent = event.target.value;
    const isPostValid = postContent.length >= 5;
    this.setState({ postContent, isPostValid });
  };

  handleImageChange = (event) => {
    const image = event.target.files[0];
    this.setState({ postImage: image });
  };

  handlePostSubmit = (event) => {
    event.preventDefault();

    const { postContent, postImage } = this.state;

    if (postContent.trim() !== '') {
      const newPost = {
        id: Date.now().toString(),
        author: 'Nursery Office',
        content: postContent,
        image: postImage,
        likes: 0,
        comments: [],
      };

      this.setState((prevState) => ({
        posts: [...prevState.posts, newPost],
        postContent: '',
        postImage: null,
        isPostValid: false,
      }));
    }
  };

  render() {
    const { posts, postContent, postImage, isPostValid } = this.state;

    return (
      <div className="feed">
        <h1>Create New Post</h1>
        <form className="post-form" onSubmit={this.handlePostSubmit}>
          <textarea
            value={postContent}
            onChange={this.handlePostChange}
            placeholder="Write a new post..."
          ></textarea>
          <input type="file" accept="image/*" multiple onChange={this.handleImageChange} />
          {postContent.length < 5 && (
            <p className="validation-message">The post should be at least 5 characters</p>
          )}
          <button type="submit" disabled={!isPostValid}>
            Post
          </button>
        </form>
        <div className="post-list">
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </div>
    );
  }
}

export default Feed;
