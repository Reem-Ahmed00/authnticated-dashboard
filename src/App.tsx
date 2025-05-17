import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import PostsPage from "./pages/PostsPage";
import NewPostPage from "./pages/NewPostPage";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/NavBar";
import EditPost from "./components/Dashboard/EditPost";
import { RootState, AppDispatch } from "./redux/store";


function App() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

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
