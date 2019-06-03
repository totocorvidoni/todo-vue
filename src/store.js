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
      todos: [1, 2, 4]
    },
    projects: {
      1: {
        id: 1,
        name: "A Project whose name is extremely long so I can test ellipsis",
        todos: [1, 2, 4]
      },
      2: {
        id: 2,
        name: "Of Dog and Men",
        todos: [1, 3, 4]
      },
      3: {
        id: 3,
        name: "Canis Lupus",
        todos: [1, 2, 4]
      },
      4: {
        id: 4,
        name: "Howling at the Moon",
        todos: [1, 2, 4]
      },
      5: {
        id: 5,
        name: "Gipsy Curses",
        todos: [1, 2, 4]
      }
    },
    todos: {
      1: {
        id: 1,
        title: "feed the dog",
        description:
          "Newton is a friendly dog who likes to eat. Feeding it is my job.",
        dueDate: new Date(2019, 4, 30, 16, 0),
        notes: [
          "We are out of food.",
          "The store was closed.",
          "Must research if cookie based diets are healthy for dogs.",
          "Day 15: we are running out of cookies.",
          "Day 16: Newton has ran out of patience..."
        ],
        priority: 3,
        completed: false
      },
      2: {
        id: 2,
        title: "play with the dog",
        description:
          "Newton is a friendly dog who likes to eat. Feeding it is my job.",
        dueDate: new Date(2019, 4, 30, 16, 0),
        notes: [
          "We are out of food.",
          "The store was closed.",
          "Must research if cookie based diets are healthy for dogs.",
          "Day 15: we are running out of cookies.",
          "Day 16: Newton has ran out of patience..."
        ],
        priority: 3,
        completed: false
      },
      3: {
        id: 3,
        title: "eat with the dog",
        description:
          "Newton is a friendly dog who likes to eat. Feeding it is my job.",
        dueDate: new Date(2019, 4, 30, 16, 0),
        notes: [
          "We are out of food.",
          "The store was closed.",
          "Must research if cookie based diets are healthy for dogs.",
          "Day 15: we are running out of cookies.",
          "Day 16: Newton has ran out of patience..."
        ],
        priority: 3,
        completed: false
      },
      4: {
        id: 4,
        title: "be the dog",
        description:
          "Newton is a friendly dog who likes to eat. Feeding it is my job.",
        dueDate: new Date(2019, 4, 30, 16, 0),
        notes: [
          "We are out of food.",
          "The store was closed.",
          "Must research if cookie based diets are healthy for dogs.",
          "Day 15: we are running out of cookies.",
          "Day 16: Newton has ran out of patience..."
        ],
        priority: 3,
        completed: false
      }
    },
    activeProjectId: null,
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

    removeTodoFromDefaultProject(state, todoId) {
      state.defaultProject.todos.splice(
        state.defaultProject.todos.indexOf(todoId),
        1
      );
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
      state.todos[payload.todoId].dueDate = payload.dueDate;
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
          priority: parseInt(payload.priority) || 0,
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
      // TODO - When project is removed its todos should be removed too.
      if (state.activeProjectId == id) {
        commit("removeActiveProject", null);
      }
    },

    setActiveProject({ commit }, id) {
      commit("setActiveProject", id);
      commit("removeActiveTodo");
    }
  },

  getters: {
    activeProject(state) {
      try {
        return state.projects[state.activeProjectId];
      } catch (error) {
        console.log(error);
      }
    },

    activeTodo(state) {
      try {
        return state.todos[state.activeTodoId];
      } catch (error) {
        console.log(error);
      }
    },

    activeTodos(state, { activeProject }) {
      try {
        return pick(state.todos, activeProject.todos);
      } catch (error) {
        console.log(error);
      }
    },

    noActiveTodos(state, { activeProject }) {
      try {
        return isEmpty(activeProject.todos);
      } catch (error) {
        console.log(error);
      }
    }
  }
});
