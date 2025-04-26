import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/api';

function AdminPage() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await API.get('/projects');
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <h2>All Projects</h2>
      <ul>
        {projects.map((project) => (
          <li key={project._id}>
            {project.title} - {project.status}
          </li>
        ))}
      </ul>

      <br />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default AdminPage;
