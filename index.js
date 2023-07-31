import { State } from "./state.js";
import { Renderer } from "./renderer.js";
import { TASK_STATUS } from "./constants.js";
import { Task } from "./task.js";

const state = new State();
state.restore();
const renderer = new Renderer(state);
renderer.render();

document.getElementById("add_task_button").addEventListener("click", () => {
  const title = document.getElementById("todo_task_name").value.trim();
  if (!title) {
    return;
  }

  const task = new Task(title, TASK_STATUS.TODO);

  state.add(task);
  state.save();
  renderer.render();
});
