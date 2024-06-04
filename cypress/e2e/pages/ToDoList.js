class ToDoList {
  // locators
  getToDoTitle() {
    return cy.get(".panel > p");
  }

  getInputField() {
    return cy.get("#input-add");
  }

  getMyTaskFields() {
    return cy.get(".panel > div");
  }

  getAddButton() {
    return cy.get("#add-btn");
  }

  getSearchField() {
    return cy.get("#search");
  }

  getEmptyTaskList() {
    return cy.get(".todo-item > p");
  }
  getTaskList() {
    return cy.get("#panel").children();
  }

  getTaskListName(index) {
    return cy.get("#panel").children().eq(index);
  }

  getTaskListIcon() {
    return cy.get(".mr-auto").children();
  }
  getExactTaskListIcon(index) {
    return cy.get(".mr-auto").children().eq(index);
  }
  getAllTask() {
    return cy.get(".panel-block > div");
  }
  getRemoveButton() {
    return cy.get("#clear");
  }
  getError() {
    return cy.get("[class='notification is-danger']");
  }

  // methods
  clickAddButton() {
    this.getAddButton().click();
  }

  typeNewTask(taskName) {
    this.getInputField().clear().type(`${taskName}{enter}`);
  }

  completeTask(index) {
    this.getExactTaskListIcon(index).click();
  }

  removeTask() {
    this.getRemoveButton().click();
  }
  noTaskValidation() {
    this.getEmptyTaskList()
      .should("have.text", "No tasks found!")
      .and("have.length", 1);
  }
  filterTask(taskName) {
    return this.getSearchField().type(taskName);
  }
}
export default ToDoList;
