import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/api';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function UserPage() {
  const [projects, setProjects] = useState([]);
  const [assignedSubtasks, setAssignedSubtasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
    fetchAssignedSubtasks();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await API.get('/projects/my-projects');
      setProjects(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAssignedSubtasks = async () => {
    try {
      const response = await API.get('/subtasks/assigned');
      setAssignedSubtasks(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateProject = () => {
    navigate('/add-project');
  };

  return (
    <div className="user-dashboard">
      <h1>User Dashboard</h1>

      <button onClick={handleCreateProject}>Create New Project</button>

      <h2>My Projects</h2>
      {projects.length === 0 ? (
        <p>No projects created yet.</p>
      ) : (
        <ul>
          {projects.map((project) => (
            <li key={project._id}>
              <strong>{project.title}</strong> - {project.status}
            </li>
          ))}
        </ul>
      )}

      <h2>Project Status Chart</h2>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={projects.map(p => ({ name: p.title, status: p.status === 'completed' ? 1 : 0 }))}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="status" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <h2>Assigned Subtasks</h2>
      {assignedSubtasks.length === 0 ? (
        <p>No assigned subtasks.</p>
      ) : (
        <ul>
          {assignedSubtasks.map((subtask) => (
            <li key={subtask._id}>
              {subtask.title} - {subtask.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserPage;
