import Vue from "vue";
import Vuex from "vuex";
import uuid from "uuid/v4";
import { pick, isEmpty } from "lodash";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    defaultProject: {
      id: 0,
      name: "Default Project",
      todos: []
    },
    projects: {
      1: {
        id: 1,
        name: "A Project whose name is extremely long so I can test ellipsis",
        todos: [0, 1, 3]
      },
      2: {
        id: 2,
        name: "Of Dog and Men",
        todos: [0, 2, 3]
      },
      3: {
        id: 3,
        name: "Canis Lupus",
        todos: [0, 1, 3]
      },
      4: {
        id: 4,
        name: "Howling at the Moon",
        todos: [0, 1, 3]
      },
      5: {
        id: 5,
        name: "Gipsy Curses",
        todos: [0, 1, 3]
      }
    },
    todos: {
      0: {
        id: 0,
        title: "feed the dog",
        completed: false
      },
      1: {
        id: 1,
        title: "play with the dog",
        completed: false
      },
      2: {
        id: 2,
        title: "eat with the dog",
        completed: false
      },
      3: {
        id: 3,
        title: "be the dog",
        completed: false
      }
    },
    activeProjectId: 0,
    activeTodoId: null,
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
      if (state.activeProjectId) {
        state.projects[state.activeProjectId].todos.push(todoId);
      } else {
        state.defaultProject.todos.push(todoId);
      }
    },

    removeProject(state, id) {
      Vue.delete(state.projects, id);
    },

    removeTodo(state, id) {
      Vue.delete(state.todos, id);
    },

    removeTodoFromProject(state, todoId) {
      const project = state.projects[state.activeProjectId];
      project.todos.splice(project.todos.indexOf(todoId), 1);
    },

    setActiveProject(state, id) {
      state.activeProjectId = id;
    },

    removeActiveProject(state) {
      state.activeProjectId = null;
    },

    setActiveTodo(state, id) {
      state.activeTodoId = id;
    },

    removeActiveTodo(state) {
      state.activeTodoId = null;
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
      const todo = state.todos[payload.todoId];
      todo.notes.splice(todo.notes.indexOf(payload.note), 1);
    },

    completeTodo(state, payload) {
      state.todos[payload.todoId].completed = true;
    },

    incompleteTodo(state, payload) {
      state.todos[payload.todoId].completed = false;
    },

    toggleTodo(state, id) {
      state.todos[id].completed = !state.todos[id].completed;
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

    removeTodo({ commit, state }, id) {
      commit("removeTodo", id);
      commit("removeTodoFromProject", id);
      if (state.activeTodoId == id) {
        commit("removeActiveTodo");
      }
    },

    removeProject({ commit, state }, id) {
      commit("removeProject", id);
      if (state.activeProjectId == id) {
        commit("removeActiveProject", null);
      }
    },

    setActiveProject({ commit }, id) {
      commit("setActiveProject", id);
      commit("setActiveTodo", null);
    }
  },

  getters: {
    activeProject(state) {
      return state.projects[state.activeProjectId];
    },

    activeTodos(state, { activeProject }) {
      if (activeProject) return pick(state.todos, activeProject.todos);
    },

    noActiveTodos(state, { activeProject }) {
      if (activeProject) return isEmpty(activeProject.todos);
    }
  }
});
