import API from '../api/api';

export const assignSubtask = (subtaskData) => API.post('/subtasks', subtaskData);
export const getAssignedSubtasks = () => API.get('/subtasks/assigned');
