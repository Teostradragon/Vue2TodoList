import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

export default {
  getTodos() {
    return apiClient.get('/todos');
  },
  postTodo(todo) {
    return apiClient.post('/todos', todo);
  },
  putTodo(id, todo) {
    return apiClient.put(`/todos/${id}`, todo);
  },
  deleteTodo(id) {
    return apiClient.delete(`/todos/${id}`);
  }
};
