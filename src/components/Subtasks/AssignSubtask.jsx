import React, { useState, useEffect } from 'react';
import { getAllUsers } from '../../services/userService';
import { getAllProjects } from '../../services/projectService';
import { assignSubtask } from '../../services/subtaskService';

const AssignSubtask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [project, setProject] = useState('');
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchUsers();
    fetchProjects();
  }, []);

  const fetchUsers = async () => {
    const res = await getAllUsers();
    setUsers(res.data);
  };

  const fetchProjects = async () => {
    const res = await getAllProjects();
    setProjects(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await assignSubtask({ title, description, assignedTo, project });
      alert('Subtask assigned successfully!');
      setTitle('');
      setDescription('');
      setAssignedTo('');
      setProject('');
    } catch (err) {
      alert('Failed to assign subtask');
    }
  };

  return (
    <div>
      <h2>Assign New Subtask</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        
        <select value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} required>
          <option value="">Select User</option>
          {users.map(user => <option key={user._id} value={user._id}>{user.name}</option>)}
        </select>

        <select value={project} onChange={(e) => setProject(e.target.value)} required>
          <option value="">Select Project</option>
          {projects.map(project => <option key={project._id} value={project._id}>{project.title}</option>)}
        </select>

        <button type="submit">Assign Subtask</button>
      </form>
    </div>
  );
};

export default AssignSubtask;
