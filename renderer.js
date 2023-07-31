import { TASK_STATUS } from "./constants.js";

class ColumnRenderer {
  constructor(rootId) {
    const root = document.getElementById(rootId);
    if (!root) {
      throw new Error(
        `Root element with id ${rootId} doesn't exist in the document`
      );
    }
    this.root = root;
  }

  clear() {
    while (this.root.firstChild) {
      this.root.removeChild(this.root.firstChild);
    }
  }

  renderItem(task) {
    const newDiv = document.createElement("div"),
      taskActions = document.createElement("div"),
      textElement = document.createElement("p");
    taskActions.setAttribute("class", "more_actions_button");
    taskActions.insertAdjacentHTML(
      "afterbegin",
      `<img class="more_actions_icon" src="/images/more-actions-vertical.svg" alt="more-actions">`
    );
    textElement.textContent = task.title;
    newDiv.setAttribute("class", "task_row");
    newDiv.appendChild(textElement);
    newDiv.appendChild(taskActions);
    this.root.appendChild(newDiv);
    this.addMoreActionsTooltip(taskActions, task.status);
  }

  addMoreActionsTooltip(container, currentStatus) {
    const statuses = Object.values(TASK_STATUS).filter(
      (status) => status !== currentStatus
    );
    const tooltipContent = document.createElement("div");
    tooltipContent.setAttribute("class", "tooltip_content");
    const action1 = document.createElement("div"),
      action2 = document.createElement("div");
    action1.textContent = `Move to ${statuses[0]}`;
    action2.textContent = `Move to ${statuses[1]}`;
    tooltipContent.appendChild(action1);
    tooltipContent.appendChild(action2);
    container.appendChild(tooltipContent);
  }
}

class ToDoColumnRenderer extends ColumnRenderer {
  constructor() {
    super("column-todo");
  }

  getStatus() {
    return TASK_STATUS.TODO;
  }
}

class InProgressColumnRenderer extends ColumnRenderer {
  constructor() {
    super("column-inprogress");
  }

  getStatus() {
    return TASK_STATUS.IN_PROGRESS;
  }
}

class DoneColumnRenderer extends ColumnRenderer {
  constructor() {
    super("column-done");
  }

  getStatus() {
    return TASK_STATUS.DONE;
  }
}

export class Renderer {
  constructor(state) {
    this.state = state;
    this.columnRenderers = [
      new ToDoColumnRenderer(),
      new InProgressColumnRenderer(),
      new DoneColumnRenderer(),
    ];
  }

  render() {
    this.columnRenderers.forEach((renderer) => {
      renderer.clear();

      const items = this.state.getByStatus(renderer.getStatus());

      items.forEach((item) => renderer.renderItem(item));
    });
  }
}
