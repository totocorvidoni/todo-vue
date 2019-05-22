import store from "@/store";

describe("state", () => {
  it("has a project list", () => {
    expect(store.state.projects).toBeDefined();
  });

  it("has a todos list", () => {
    expect(store.state.todos).toBeDefined();
  });

  it("has an activeProject property", () => {
    expect(store.state.activeProject).toBeDefined();
  });

  it("has an active todo property", () => {
    expect(store.state.activeTodo).toBeDefined();
  });
});

// describe("mutations", () => {
//    describe("addProject", () => {
//     it("adds a project to list", () => {
//       store.commit("addProject", { id: 1, data: { name: "ProjectName" } });
//       expect(store.state.projects[1]).toEqual({ name: "ProjectName" });
//     });
//   });

//   describe("addTodo", () => {
//     it("adds a todo to list", () => {
//       store.commit("addTodo", { id: 1, data: { name: "TodoName" } });

//       expect(store.state.todos[1]).toEqual({ name: "TodoName" });
//     });
//   });
// });
