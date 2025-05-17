import { useState, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { RootState, AppDispatch } from "../../redux/store";
import { Post } from "../../../types";
import { deletePost } from "../../redux/slices/postsSlice";

/**
 * Posts component displays a paginated, searchable list of all posts.
 * Each post can be edited or deleted.
 * @component
 */
export default function Posts() {
  /** Redux dispatch function */
  const dispatch = useDispatch<AppDispatch>();
  /** All posts from Redux store */
  const posts = useSelector<RootState, Post[]>((state) => state.posts.posts);
  /** Search input state */
  const [search, setSearch] = useState<string>("");
  /** Current page for pagination */
  const [currentPage, setCurrentPage] = useState<number>(1);
  /** Number of posts per page */
  const postsPerPage = 5;

  /**
   * Filters posts based on search input.
   * @param post - The post to check.
   * @returns True if post matches search.
   */
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase()) ||
    post.body.toLowerCase().includes(search.toLowerCase())
  );

  /** Index of last post on current page */
  const indexOfLastPost = currentPage * postsPerPage;
  /** Index of first post on current page */
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  /** Posts to display on current page */
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  /**
   * Handles search input change.
   * @param e - Input change event.
   */
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  /**
   * Handles deleting a post.
   * @param id - The id of the post to delete.
   */
  const handleDelete = (id: number) => {
    dispatch(deletePost(id));
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
        data-testid="search-input"
      />
      {currentPosts.map((post) => (
        <div
          key={post.id}
          className="card mb-3 shadow-sm d-flex flex-row align-items-center"
          data-testid="post-card"
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
            <button
              className="btn btn-danger btn-sm ms-2"
              onClick={() => handleDelete(post.id)}
              data-testid={`delete-btn-${post.id}`}
            >
              Delete
            </button>
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
              className={`btn ${currentPage === i + 1 ? "btn-primary" : "btn-secondary"
                }`}
              data-testid={`page-btn-${i + 1}`}
            >
              {i + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
}