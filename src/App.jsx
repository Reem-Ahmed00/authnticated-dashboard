import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import PostsPage from "./pages/PostsPage.jsx";
import NewPostPage from "./pages/NewPostPage.jsx";
import PrivateRoute from "./components/PrivateRoute";
import { useDispatch } from "react-redux";
import { logout } from "./redux/slices/authSlice";
import Navbar from "./components/NavBar.jsx";
import EditPost from "./components/Dashboard/EditPost.jsx";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Navigate to="/signup" />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
          <Route path="/posts" element={<PostsPage />} />
          <Route
            path="/new-post"
            element={
              <PrivateRoute>
                <NewPostPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit-post/:id"
            element={
              <PrivateRoute>
                <EditPost />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/signup" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
