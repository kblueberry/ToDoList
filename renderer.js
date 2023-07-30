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
    const newDiv = document.createElement("div");
    newDiv.textContent = task.title;
    newDiv.setAttribute("data-task-id", task.id);
    this.root.appendChild(newDiv);
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
