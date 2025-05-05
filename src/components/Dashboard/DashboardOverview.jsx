import { useSelector } from "react-redux";

export default function DashboardOverview() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="dashboard-container">
      <h1>Welcome, {user?.username || "User"}!</h1>
      <p>This is your dashboard. Use the navigation to explore.</p>
    </div>
  );
}