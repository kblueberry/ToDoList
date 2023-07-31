import { TASK_STATUS } from "../constants.js";

class ColumnRenderer {
  constructor(rootId, state) {
    const root = document.getElementById(rootId);
    if (!root) {
      throw new Error(
        `Root element with id ${rootId} doesn't exist in the document`
      );
    }
    this.root = root;
    this.state = state;
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
    this.renderActionsTooltip(taskActions, task);
  }

  renderActionsTooltip(container, task) {
    const statuses = Object.values(TASK_STATUS).filter(
      (status) => status !== task.status
    );
    const tooltipContent = document.createElement("div");
    tooltipContent.setAttribute("class", "tooltip_content");

    statuses.forEach((status) => {
      const action = document.createElement("div");
      action.textContent = `Move to ${status}`;
      action.addEventListener("click", () =>
        this.state.changeStatus(task.id, status)
      );
      tooltipContent.appendChild(action);
    });

    container.appendChild(tooltipContent);
  }
}

class ToDoColumnRenderer extends ColumnRenderer {
  constructor(state) {
    super("column-todo", state);
  }

  getStatus() {
    return TASK_STATUS.TODO;
  }
}

class InProgressColumnRenderer extends ColumnRenderer {
  constructor(state) {
    super("column-inprogress", state);
  }

  getStatus() {
    return TASK_STATUS.IN_PROGRESS;
  }
}

class DoneColumnRenderer extends ColumnRenderer {
  constructor(state) {
    super("column-done", state);
  }

  getStatus() {
    return TASK_STATUS.DONE;
  }
}

export class Renderer {
  constructor(state) {
    this.state = state;
    this.columnRenderers = [
      new ToDoColumnRenderer(state),
      new InProgressColumnRenderer(state),
      new DoneColumnRenderer(state),
    ];
    this.state.addChangeListener(() => this.render());
  }

  render() {
    this.columnRenderers.forEach((renderer) => {
      renderer.clear();

      const items = this.state.getByStatus(renderer.getStatus());

      items.forEach((item) => renderer.renderItem(item));
    });
  }
}
