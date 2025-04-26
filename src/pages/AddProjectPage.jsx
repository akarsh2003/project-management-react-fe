import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/api';

function AddProjectPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleAddProject = async (e) => {
    e.preventDefault();

    try {
      await API.post('/projects', {
        title,
        description,
      });

      alert('Project added successfully!');
      navigate('/user'); // after adding project, go back to dashboard
    } catch (err) {
      console.error(err);
      alert('Error adding project');
    }
  };

  return (
    <div className="add-project-container">
      <h1>Add New Project</h1>
      <form onSubmit={handleAddProject}>
        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br /><br />
        <textarea
          placeholder="Project Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows="5"
          cols="30"
        ></textarea>
        <br /><br />
        <button type="submit">Create Project</button>
      </form>
    </div>
  );
}

export default AddProjectPage;
