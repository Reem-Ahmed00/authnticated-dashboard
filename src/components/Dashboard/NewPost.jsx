import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchPosts } from "../../redux/slices/postsSlice";

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && content) {
      // Simulate adding a new post
      const newPost = { id: Date.now(), title, body: content };
      dispatch(fetchPosts.fulfilled([newPost]));
      setTitle("");
      setContent("");
    }
  };

  return (
    <div className="new-post-container">
      <h1>Create New Post</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}