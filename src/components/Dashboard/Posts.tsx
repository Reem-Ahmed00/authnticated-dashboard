import { useState, ChangeEvent } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../redux/store";
import { Post } from "../../../types";

export default function Posts() {
  const posts = useSelector<RootState, Post[]>((state) => state.posts.posts);
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 5;

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase()) ||
    post.body.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="container py-4">
      <h2>All Posts</h2>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search posts..."
        value={search}
        onChange={handleSearchChange}
      />
      {currentPosts.map((post) => (
        <div
          key={post.id}
          className="card mb-3 shadow-sm d-flex flex-row align-items-center"
        >
          <img
            src={post.image || "/images/blog.png"}
            alt={post.title}
            className="rounded-circle"
            style={{
              width: "80px",
              height: "80px",
              objectFit: "cover",
              margin: "10px",
            }}
          />
          <div className="card-body">
            <h5 className="card-title">{post.title}</h5>
            <p className="card-text">{post.body}</p>
            <Link to={`/edit-post/${post.id}`} className="btn btn-primary btn-sm">
              Edit
            </Link>
          </div>
        </div>
      ))}
      <div className="pagination">
        {Array.from(
          { length: Math.ceil(filteredPosts.length / postsPerPage) },
          (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`btn ${
                currentPage === i + 1 ? "btn-primary" : "btn-secondary"
              }`}
            >
              {i + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
}
