import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const [profile, setProfile] = useState(null);

  const navigate = useNavigate();

  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!title) return;
    await API.post("/tasks", { title });
    setTitle("");
    fetchTasks();
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const filteredTasks = tasks.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    fetchTasks();
    API.get("/profile").then((res) => setProfile(res.data));
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        {/* <button className="btn logout" onClick={logout}>
          Logout
        </button> */}
      </div>

      {profile && (
        <p className="welcome-text">Welcome, {profile.name}</p>
      )}

      <div className="task-controls">
        <input
          placeholder="Search tasks"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <input
          placeholder="New Task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button className="btn primary" onClick={addTask}>
          Add Task
        </button>
      </div>

      <ul className="task-list">
        {filteredTasks.map((t) => (
          <li key={t._id} className="task-item">
            {t.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;


