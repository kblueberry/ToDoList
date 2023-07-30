const LOCAL_STORAGE_KEY = "kblueberry_todos";

export class State {
  constructor() {
    this.todos = {};
  }

  restore() {
    const storedValue = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedValue) {
      this.todos = JSON.parse(storedValue);
    }
  }

  save() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.todos));
  }

  add(task) {
    this.todos[task.id] = task;
  }

  changeStatus(id, newStatus) {
    const item = this.todos[id];
    if (!item) {
      return;
    }

    item.status = newStatus;
  }

  delete(id) {
    this.todos.delete(id);
  }

  getByStatus(status) {
    const result = [];
    Object.values(this.todos).forEach((item) => {
      if (item.status === status) {
        result.push(item);
      }
    });

    return result;
  }
}
