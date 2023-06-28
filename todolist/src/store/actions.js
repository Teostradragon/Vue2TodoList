import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_BASEAPI,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

export default {
  async getProjects({ commit }) {
    try {
      const response = await apiClient.get('/api/todos'); // 使用 apiClient 调用 API
      const projects = response.data;
      commit('setProjects', projects); // 使用正确的 mutation 名称和参数
      console.log('VUE_APP_BASEAPI:', process.env.VUE_APP_BASEAPI);
    console.log('Projects fetched from the server:', projects);
    } catch (error) {
      console.error(error);
    }
  },

  async addProject({ commit }, project) {
    try {
      const response = await apiClient.post('/api/todos', project); // 使用 apiClient 调用 API
      commit('newTodo', response.data); // 使用正确的 mutation 名称和参数
    } catch (error) {
      console.error(error);
    }
  },

  async deleteProject({ commit }, id) {
    try {
      await apiClient.delete(`/api/todos/${id}`);
      commit('removeTodo', id);
    } catch (error) {
      console.error(error);
    }
  },


};
