import todoApi from '@/api/todoApi.js';

export const actions = {
  async fetchTodos({ commit }) {
    try {
      const response = await todoApi.getTodos();
      commit('setTodos', response.data);
    } catch (error) {
      console.error(error);
    }
  },
  async createTodo({ commit }, todo) {
    try {
      const response = await todoApi.postTodo(todo);
      commit('newTodo', response.data);
    } catch (error) {
      console.error(error);
    }
  },
  async updateTodo({ commit }, { id, todo }) {
    try {
      const response = await todoApi.putTodo(id, todo);
      commit('updateTodo', { id, todo: response.data });
    } catch (error) {
      console.error(error);
    }
  },
  async deleteTodo({ commit }, id) {
    try {
      await todoApi.deleteTodo(id);
      commit('deleteTodo', id);
    } catch (error) {
      console.error(error);
    }
  }
};
