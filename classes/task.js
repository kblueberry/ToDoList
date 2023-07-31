export class Task {
  constructor(taskName, status) {
    this.id = Date.now();
    this.title = taskName;
    this.status = status;
  }
}
