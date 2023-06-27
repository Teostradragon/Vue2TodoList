import todoApi from '../api/todoApi';

export default {
  async getTodos({ commit }) {
    const response = await todoApi.getTodos();
    commit('SET_TODOS', response.data);
  },
  async addTodo({ commit }, name) {
    const response = await todoApi.createTodo({
      name,
      status: 'Incomplete',
    });
    commit('ADD_TODO', response.data);
  },
  async deleteTodo({ commit }, id) {
    await todoApi.deleteTodo(id);
    commit('REMOVE_TODO', id);
  },
  async updateTodo({ commit }, updatedTodo) {
    const response = await todoApi.updateTodo(updatedTodo);
    commit('UPDATE_TODO', response.data);
  },
};
