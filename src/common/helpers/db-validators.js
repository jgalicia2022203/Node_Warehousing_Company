import Tasks from "../../tasks/task.model.js";

export const existTaskById = async (id = "") => {
  const existTasks = await Tasks.findById(id);
  if (!existTasks) {
    throw new Error(`The task with ${id} does not exist`);
  }
};

export const tasksExist = async (name = "") => {
  const existTasks = await Tasks.findOne({ name });
  if (existTasks) {
    throw new Error(`Task ${name} is already registered in the database`);
  }
};
