import API from '../api/api';

export const getAllProjects = () => API.get('/projects');
export const createProject = (projectData) => API.post('/projects', projectData);
