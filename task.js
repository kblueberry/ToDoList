export default class Task {
  constructor(taskName, status) {
    this.id = new Date();
    this.taskName = taskName;
    this.taskStatus = status;
  }

  addNew(value, parent) {
    const plannedTasks = localStorage.getItem("tasks planned");
    if (!plannedTasks) {
      localStorage.setItem("tasks planned", JSON.stringify([this.id]));
    } else {
      JSON.parse(plannedTasks).push(this.id);
      localStorage.setItem("tasks planned", JSON.stringify(plannedTasks));
    }
    const taskElement = document.createElement("p");
    taskElement.setAttribute("class", "column_task");
    taskElement.setAttribute("draggable", "true");
    parent.appendChild(taskElement);
    console.log("new task is: ", this.taskName, this.taskStatus);
    console.log("new task element: ", taskElement);
  }
}

// export default class AddNewTask extends Task {
//   constructor() {
//     super();
//   }
//
//   addNew(name) {
//     const task = new super.Task(name, Constants.Planned);
//     const plannedTasks = localStorage.getItem("tasks planned");
//     if (!plannedTasks) {
//       localStorage.setItem("tasks planned", JSON.stringify([task.id]));
//     } else {
//       plannedTasks.push(task.id);
//       localStorage.setItem("tasks planned", JSON.stringify(plannedTasks));
//     }
//   }
// }
