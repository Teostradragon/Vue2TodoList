export const mutations = {
  setTodos: (state, todos) => (state.todos = todos),
  newTodo: (state, todo) => state.todos.unshift(todo),
  updateTodo: (state, { id, todo }) => {
    const index = state.todos.findIndex(t => t._id === id);
    if (index !== -1) {
      state.todos.splice(index, 1, todo);
    }
  },
  deleteTodo: (state, id) => {
    const index = state.todos.findIndex(t => t._id === id);
    if (index !== -1) {
      state.todos.splice(index, 1);
    }
  }
};
