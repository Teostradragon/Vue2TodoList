export default {
  SET_TODOS(state, todos) {
    state.todos = todos;
  },
  ADD_TODO(state, todo) {
    state.todos.unshift(todo);
  },
  REMOVE_TODO(state, todoId) {
    state.todos = state.todos.filter((todo) => todo._id !== todoId);
  },
  UPDATE_TODO(state, updatedTodo) {
    const index = state.todos.findIndex((todo) => todo._id === updatedTodo._id);
    if (index !== -1) {
      state.todos.splice(index, 1, updatedTodo);
    }
  },
};
