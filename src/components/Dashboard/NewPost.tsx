import { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../../redux/slices/postsSlice";
import { useNavigate } from "react-router-dom";
import { RootState, AppDispatch } from "../../redux/store";
import { Post, User } from "../../../types";

export default function NewPost() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null);
  const [error, setError] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector<RootState, User | null>((state) => state.auth.user);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      setError("Title and content are required.");
      return;
    }

    if (!user) {
      setError("User not found. Please login.");
      return;
    }

    const newPost: Post = {
      id: Date.now(),
      username: user.username,
      title,
      body: content,
      image: (image as string) || "/images/blog.png",
    };

    dispatch(addPost(newPost));
    setTitle("");
    setContent("");
    setImage(null);
    setImagePreview(null);
    setError("");
    navigate("/posts");
  };

  return (
    <div className="container py-4" style={{ maxWidth: "600px" }}>
      <h2>Create New Post</h2>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            id="title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <label htmlFor="title">Title</label>
        </div>
        <div className="form-floating mb-3">
          <textarea
            className="form-control"
            id="content"
            style={{ height: 200 }}
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <label htmlFor="content">Content</label>
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Upload Image</label>
          <input
            type="file"
            className="form-control"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
          />
          {imagePreview && (
            <div className="mt-3">
              <p>Image Preview:</p>
              <img
                src={imagePreview as string}
                alt="Preview"
                style={{ width: "100%", maxHeight: "200px", objectFit: "cover" }}
              />
            </div>
          )}
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <button type="submit" className="btn btn-success" style={{ maxWidth: "200px" }}>
            Publish
          </button>
        </div>
      </form>
    </div>
  );
}
