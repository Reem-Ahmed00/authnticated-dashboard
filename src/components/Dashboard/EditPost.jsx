import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../../redux/slices/postsSlice";
import { useNavigate, useParams } from "react-router-dom";

export default function EditPost() {
  const { id } = useParams();
  const post = useSelector((state) => state.posts.posts.find((p) => p.id === Number(id)));
  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.body || "");
  const [image, setImage] = useState(post?.image || "");
  const [imagePreview, setImagePreview] = useState(post?.image || "");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Store the base64 string
        setImagePreview(reader.result); // Preview the image
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePost({ id: post.id, title, body: content, image }));
    navigate("/posts");
  };

  return (
    <div className="container py-4">
      <h2>Edit Post</h2>
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
                src={imagePreview}
                alt="Preview"
                style={{ width: "100%", maxHeight: "200px", objectFit: "cover" }}
              />
            </div>
          )}
        </div>
        <button type="submit" className="btn btn-primary">Update Post</button>
      </form>
    </div>
  );
}