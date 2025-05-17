import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Post} from "../../../types";

export default function DashboardOverview() {
  const user = useSelector((state: RootState) => state.auth.user);
  const posts = useSelector((state: RootState) =>
    state.posts.posts.filter((post: Post) => post.username === user?.username)
  );

  return (
    <div className="container py-5">
      <div className="card shadow mb-4 p-4 d-flex flex-column align-items-center">
        <img
          src={user?.profileImage || "/images/user.png"}
          alt="Profile"
          className="rounded-circle mb-3"
          style={{ width: "150px", height: "150px", objectFit: "cover" }}
        />
        <h2 className="text-center mb-3">Welcome, {user?.username || "User"}!</h2>
        <p className="text-center text-muted">
          This is your dashboard. Here you can view your profile and posts.
        </p>
      </div>

      <h3 className="mb-4">Your Posts</h3>
      {posts.length === 0 ? (
        <p className="text-muted">You have no posts yet. Create a new post to get started!</p>
      ) : (
        <div className="row g-4">
          {posts.map((post) => (
            <div key={post.id} className="col-md-6">
              <div className="card shadow-sm">
                <img
                  src={post.image || "https://via.placeholder.com/300x200"}
                  alt={post.title}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text">{post.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
