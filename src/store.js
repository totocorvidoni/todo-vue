import Vue from "vue";
import Vuex from "vuex";
import uuid from "uuid/v4";
import { pull, pick, isEmpty } from "lodash";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    projects: {
      0: {
        id: 0,
        name: "Default Project",
        todos: [0, 1, 3]
      }
    },
    todos: {
      0: {
        id: 0,
        title: "feed the dog"
      },
      1: {
        id: 1,
        title: "play with the dog"
      },
      2: {
        id: 2,
        title: "eat with the dog"
      },
      3: {
        id: 3,
        title: "be the dog"
      }
    },
    activeProject: {
      id: 0,
      name: "Default Project",
      todos: [0, 1, 3]
    },
    activeTodo: null,
    mostRecentProject: null,
    mostRecentTodo: null
  },
  mutations: {
    addProject(state, project) {
      state.projects = {
        ...state.projects,
        [project.id]: project.data
      };
    },
    addTodo(state, todo) {
      state.todos = { ...state.todos, [todo.id]: todo.data };
    },
    addTodoToProject(state, todoId) {
      state.activeProject.todos.push(todoId);
    },
    removeProject(state, id) {
      delete state.projects[id];
    },
    removeTodo(state, id) {
      delete state.todos[id];
    },
    removeTodoFromProject(state, todoId) {
      pull(state.activeProject.todos, todoId);
    },
    setActiveProject(state, id) {
      state.activeProject = state.projects[id];
    },
    setActiveTodo(state, id) {
      state.activeTodo = state.todos[id];
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
    },
    setMostRecentProject(state, id) {
      state.mostRecentProject = id;
    }
  },
  actions: {
    addProject({ commit }, payload) {
      const id = uuid();
      const project = {
        id: id,
        data: {
          id: id,
          name: payload.name || "Unnamed Project",
          todos: payload.todos || []
        }
      };
      commit("addProject", project);
      commit("setMostRecentProject", project.id);
    },

    addTodo({ commit }, payload) {
      const id = uuid();
      const todo = {
        id: id,
        data: {
          id: id,
          title: payload.title || "Unnamed Todo",
          description: payload.description || "No description.",
          dueDate: payload.dueDate || null,
          priority: payload.priority || 0,
          notes: payload.notes || [],
          completed: payload.completed || false
        }
      };
      commit("addTodo", todo);
      commit("addTodoToProject", todo.id);
    },

    removeTodo({ commit }, id) {
      commit('removeTodo', id);
      commit('removeTodoFromProject', id)
    }
  },

  getters: {
    activeTodos(state) {
      return pick(state.todos, state.activeProject.todos);
    },
    noActiveTodos(state) {
      return isEmpty(state.activeProject.todos);
    }
  }
});
