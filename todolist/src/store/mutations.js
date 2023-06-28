export default {
  setProjects(state, projects) {
    state.projectsList = projects; // 更新 Vuex store 中的项目列表数据
  },
  addProject: (state, todo) => state.projectsList.unshift(todo),
  removeTodo: (state, id) =>
    (state.projectsList = state.projectsList.filter(todo => todo._id !== id)),
  
};
