import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../../redux/slices/authSlice";
import { useNavigate, Link } from "react-router-dom";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authError = useSelector((state) => state.auth.error);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setProfileImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    if (username.length < 3 || password.length < 6) {
      setError("Username must be at least 3 characters and password at least 6 characters.");
      return;
    }

    const user = {
      username,
      password,
      profileImage: profileImagePreview || "/assets/user.png", // Use default image if none is uploaded
    };

    try {
      await dispatch(signupUser(user)).unwrap();
      navigate("/login");
    } catch (err) {
      setError(err.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ width: "100%", maxWidth: "400px" }}>
        <h3 className="text-center mb-4">Signup</h3>
        {error && <p className="text-danger">{error}</p>}
        {authError && <p className="text-danger">{authError}</p>}
        <form onSubmit={handleSignup}>
          <div className="mb-3">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label>Upload Profile Image</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handleImageChange}
            />
            {profileImagePreview && (
              <div className="mt-3">
                <p>Image Preview:</p>
                <img
                  src={profileImagePreview}
                  alt="Profile Preview"
                  className="rounded-circle"
                  style={{ width: "100px", height: "100px", objectFit: "cover" }}
                />
              </div>
            )}
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Signup
          </button>
        </form>
        <p className="text-center mt-3">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}