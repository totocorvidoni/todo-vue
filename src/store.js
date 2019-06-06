import Vue from "vue";
import Vuex from "vuex";
import vuexPersist from "vuex-persist";
import uuid from "uuid/v4";
import { pick, isEmpty } from "lodash";

Vue.use(Vuex);

const vuexLocal = new vuexPersist({
  key: "todo-store",
  storage: window.localStorage,
  reducer: state => ({
    projects: state.projects,
    todos: state.todos
  })
});

export default new Vuex.Store({
  plugins: [vuexLocal.plugin],
  state: {
    projects: {
      "0": {
        id: "0",
        name: "Quick Todos",
        todos: []
      }
    },
    todos: {},
    activeProjectId: null,
    activeTodoId: null
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
      state.projects[state.activeProjectId].todos.push(todoId);
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

    finishTodo(state, payload) {
      state.todos[payload.todoId].completed = payload.date;
    },

    notFinishTodo(state, todoId) {
      state.todos[todoId].completed = null;
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
      if (id == "0") {
        alert("Sorry, the default project cannot be removed");
      } else {
        state.projects[id].todos.forEach(todoId => {
          commit("removeTodo", todoId);
        });
        commit("removeProject", id);
        if (state.activeProjectId == id) {
          commit("removeActiveProject");
        }
      }
    },

    setActiveProject({ commit }, id) {
      commit("setActiveProject", id);
      commit("removeActiveTodo");
    },

    toggleTodo({ commit, state }, id) {
      if (state.todos[id].completed) {
        commit("notFinishTodo", id);
      } else {
        commit("finishTodo", { todoId: id, date: new Date() });
      }
    },

    resetView({ commit }) {
      commit("removeActiveProject");
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
    },

    noProjects(state) {
      return isEmpty(state.projects);
    }
  }
});
