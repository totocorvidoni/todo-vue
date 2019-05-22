import Vue from "vue";
import Vuex from "vuex";
import uuid from "uuid/v4";
import { pull } from "lodash";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    projects: {},
    todos: {},
    activeProject: null,
    activeTodo: null
  },
  mutations: {
    addProject(state, payload) {
      payload.data["id"] = uuid();
      state.projects[payload.id] = {
        ...state.projects,
        [payload.id]: payload.data
      };
    },
    addTodo(state, payload) {
      payload.data["id"] = uuid();
      state.todos[payload.id] = { ...state.todos, [payload.id]: payload.data };
    },
    addTodoToProject(state, payload) {
      state.projects[payload.projectId].todos.push(payload.todoId);
    },
    removeProject(state, id) {
      delete state.projects[id];
    },
    removeTodo(state, id) {
      delete state.todos[id];
    },
    removeTodoFromProject(state, payload) {
      pull(state.projects[payload.projectId].todos, payload.todoId);
    },
    renameProject(state, payload) {
      state.projects[payload.projectId].name = payload.name;
    },
    renameTodo(state, payload) {
      state.projects[payload.todoId].name = payload.name;
    },
    changeTodoDescription(state, payload) {
      state.todos[payload.todoId].description = payload.description;
    },
    changeTodoDueDate(state, payload) {
      state.todos[payload.todoId].dueDate = payload.DueDate;
    },
    changeTodoPriority(state, payload) {
      state.todos[payload.todoId].priority = payload.priority;
    },
    addTodoNote(state, payload) {
      state.todos[payload.todoId].notes.push(payload.note);
    },
    removeTodoNote(state, payload) {
      pull(state.todos[payload.todoId].notes, payload.note);
    },
    completeTodo(state, payload) {
      state.todos[payload.todoId].completed = true;
    },
    incompleteTodo(state, payload) {
      state.todos[payload.todoId].completed = false;
    },
    toggleTodo(state, payload) {
      state.todos[payload.todoId].completed = !state.todos[payload.todoId]
        .completed;
    }
  },
  actions: {}
});
