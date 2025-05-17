import { useState, FormEvent, JSX } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../redux/slices/authSlice";
import { RootState, AppDispatch } from "../../redux/store";
import bcrypt from "bcryptjs";

export default function Login(): JSX.Element {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const authError = useSelector((state: RootState) => state.auth.error);

  const handleLogin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      // Fetch user by username
      const response = await fetch(`http://localhost:5000/users?username=${username}`);
      const users = await response.json();
      if (users.length === 0) {
        setError("Invalid username or password");
        return;
      }
      const user = users[0];
      // Compare password
      if (!bcrypt.compareSync(password, user.password)) {
        setError("Invalid username or password");
        return;
      }
      await dispatch(loginUser({ username, password: user.password })).unwrap();
      navigate("/dashboard");
    } catch (err) {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ width: "100%", maxWidth: "400px" }}>
        <h3 className="text-center mb-4">Login</h3>
        {error && <p className="text-danger">{error}</p>}
        {authError && <p className="text-danger">{authError}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              id="username"
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              id="password"
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
        <p className="text-center mt-3">
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
}
