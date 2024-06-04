/// <reference types="cypress" />
import ToDoList from "../pages/ToDoList";
const toDoList = new ToDoList();

describe("TODO List", () => {
  const taskName = ["Task1", "Task2", "Task3", "Task4", "Task5"];
  const specialTaskName = "1234567890123456789012345678901";
  const message = "Error: Todo cannot be more than 30 characters!";
  /**
   * Navigate to https://techglobal-training.com/frontend/project-6.
     Confirm that the todo-app modal is visible with the title “My Tasks.”
     Validate that the New todo input field is enabled for text entry.
     Validate ADD button is enabled.
     Validate Search field is enabled.
     Validate that the task list is empty, displaying the message “No tasks found!”
   */
  it("Test Case 01 - Todo-App Modal Verification", () => {
    toDoList.getToDoTitle().should("have.text", "My Tasks");
    toDoList.getInputField().should("be.enabled");
    toDoList.getAddButton().should("be.enabled");
    toDoList.getSearchField().should("be.enabled");
    toDoList.noTaskValidation();
  });

  /**
   * Navigate to https://techglobal-training.com/frontend/project-6
     Enter a new task in the todo input field and add it to the list.
     Validate that the new task appears in the task list.
     Validate that the number of tasks in the list is exactly one.
     Mark the task as completed by clicking on it.
     Validate item is marked as completed.
     Click on the button to remove the item you have added.
     Remove the completed task by clicking the designated removal button.
     Validate that the task list is empty, displaying the message “No tasks found!”.
   */

  it("Test Case 02 - Single Task Addition and Removal", () => {
    toDoList.typeNewTask(taskName[0]);
    toDoList.getTaskListName(0).should("have.text", taskName[0]);
    toDoList.getTaskList().should("have.length", 1);
    toDoList.completeTask(0);
    toDoList
      .getExactTaskListIcon(0)
      .should("have.attr", "class", "panel-icon has-text-success");

    toDoList.removeTask();
    toDoList.noTaskValidation();
  });

  /**
 * Navigate to https://techglobal-training.com/frontend/project-6
   Enter and add 5 to-do items individually.
   Validate that all added items match the items displayed on the list.
   Mark all the tasks as completed by clicking on them.
   Click on the “Remove completed tasks!” button to clear them.
   Validate that the task list is empty, displaying the message “No tasks found!”.
 */
  it("Test Case 03 - Multiple Task Operations", () => {
    taskName.forEach((el, index) => {
      toDoList.typeNewTask(el);
      toDoList.getTaskListName(index).should("have.text", el);
    });
    toDoList.getAllTask().each(($el) => {
      cy.wrap($el).click();
    });
    toDoList.removeTask();
    toDoList.noTaskValidation();
  });

  /**
 * Navigate to https://techglobal-training.com/frontend/project-6
   Enter and add 5 to-do items individually.
   Validate that all added items match the items displayed on the list.
   Enter the complete name of the previously added to-do item into the search bar.
   Validate that the list is now filtered to show only the item you searched for.
   Validate that the number of tasks visible in the list is exactly one.
 */
  it("Test Case 04 - Search and Filter Functionality in todo App", () => {
    taskName.forEach((el, index) => {
      toDoList.typeNewTask(el);
      toDoList.getTaskListName(index).should("have.text", el);
    });
    toDoList.getAllTask().each(($el) => {
      cy.wrap($el).click();
    });
    toDoList.filterTask(taskName.at(-1));
    toDoList.getTaskList().should("have.length", 1);
  });
  /**
 * Navigate to https://techglobal-training.com/frontend/project-6
   Attempt to add an empty task to the to-do list.
   Validate that the task list is empty, displaying the message “No task found!”.
   Enter an item name exceeding 30 characters into the list.
   Validate error message appears 
   and says “Error: Todo cannot be more than 30 characters!”.
   Add a valid item name to the list.
   Validate that the active task count is exactly one.
   Try to enter an item with the same name already present on the list.
   Validate that an error message is displayed, 
   indicating “Error: You already have {ITEM} in your todo list.”.
 */
  it("Test Case 05 - Task Validation and Error Handling", () => {
    toDoList.clickAddButton();
    toDoList.noTaskValidation();
    toDoList.typeNewTask(specialTaskName);
    toDoList.clickAddButton();
    toDoList.getError().should("have.text", message);
    toDoList.typeNewTask(taskName[0]);
    toDoList.getTaskList().should("have.length", 1);
    toDoList.typeNewTask(taskName[0]);
    toDoList
      .getError()
      .should(
        "have.text",
        `Error: You already have ${taskName[0]} in your todo list.`
      );
  });
});
