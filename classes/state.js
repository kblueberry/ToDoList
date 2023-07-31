const LOCAL_STORAGE_KEY = "kblueberry_todos";

export class State {
  constructor() {
    this.todos = {};
    this.stateListeners = [];
  }

  /**
   * Get todos from storage and trigger columns update
   */
  restore() {
    const storedValue = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedValue) {
      this.todos = JSON.parse(storedValue);
      this.#onStateChange();
    }
  }

  /**
   * Save todos in local storage
   */
  save() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.todos));
  }

  /**
   * Add new task
   * @param task
   */
  add(task) {
    this.todos[task.id] = task;
    this.#onStateChange();
  }

  /**
   * Change status of task
   * @param id
   * @param newStatus
   */
  changeStatus(id, newStatus) {
    const item = this.todos[id];
    if (!item) {
      return;
    }

    item.status = newStatus;
    this.todos[id] = item;
    this.#onStateChange();
  }

  /**
   * Get tasks by status
   * @param status
   * @returns {*[]}
   */
  getByStatus(status) {
    const result = [];
    Object.values(this.todos).forEach((item) => {
      if (item.status === status) {
        result.push(item);
      }
    });

    return result;
  }

  /**
   * Trigger columns update on task status changed
   * @param callback
   */
  addChangeListener(callback) {
    this.stateListeners.push(callback);
  }

  /**
   * Update columns after task status changed
   */
  #onStateChange() {
    this.stateListeners.forEach((callback) => callback());
  }
}
