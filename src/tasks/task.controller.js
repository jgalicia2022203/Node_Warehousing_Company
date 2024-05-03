import { request, response } from "express";
import Tasks from "./task.model.js";

export const listTasks = async (req = request, res = response) => {
  try {
    const { limit, from } = req.params;
    const query = { status: { $ne: "deleted" } };

    const [total, tasks] = await Promise.all([
      Tasks.countDocuments(query),
      Tasks.find(query).skip(Number(limit)).limit(Number(from)),
    ]);

    res.status(200).json({
      total,
      tasks,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      msg: "An unexpected error occurred during task list.",
    });
  }
};

export const createTask = async (req, res) => {
  try {
    const { name, description, endDate, creator_name } = req.body;
    const tasks = new Tasks({
      name,
      description,
      endDate,
      creator_name,
    });
    await tasks.save();

    res.status(201).json({
      msg: "Task registered in the database!",
      tasks,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      msg: "An unexpected error occurred during task creation.",
    });
  }
};

export const editTask = async (req, res) => {
  try {
    const id = req.params.id;
    const { ...rest } = req.body;
    const updatedTask = await Tasks.findByIdAndUpdate(id, rest, { new: true });
    await updatedTask.save();
    res.status(201).json({
      msg: "Task successfully updated!",
      updatedTask,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ msg: "Error changing status." });
  }
};

export const completeTask = async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Tasks.findById(id);

    const newStatus = task.status === "incomplete" ? "complete" : "incomplete";
    task.status = newStatus;
    await task.save();

    res.status(200).json({
      msg: "Task status updated successfully!",
      task,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send("Error updating the status");
  }
};

export const deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Tasks.findByIdAndUpdate(
      id,
      { status: "deleted" },
      { new: true }
    );
    res.status(200).json({
      msg: "task deleted!",
      task,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send("Error deleting task");
  }
};
