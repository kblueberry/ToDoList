const LOCAL_STORAGE_KEY = "kblueberry_todos";

export class State {
  constructor() {
    this.todos = {};
    this.stateListeners = [];
  }

  restore() {
    const storedValue = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedValue) {
      this.todos = JSON.parse(storedValue);
      this.#onStateChange();
    }
  }

  save() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.todos));
  }

  add(task) {
    this.todos[task.id] = task;
    this.#onStateChange();
  }

  changeStatus(id, newStatus) {
    const item = this.todos[id];
    if (!item) {
      return;
    }

    item.status = newStatus;
    this.todos[id] = item;
    this.#onStateChange();
  }

  delete(id) {
    this.todos.delete(id);
    this.#onStateChange();
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

  addChangeListener(callback) {
    this.stateListeners.push(callback);
  }

  #onStateChange() {
    this.stateListeners.forEach((callback) => callback());
  }
}