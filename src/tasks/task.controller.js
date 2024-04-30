"strick";

import { response, request } from "express";
import Tasks from "./task.model.js";

export const taskGet = async (req = request, res = response) => {
  const { limite, desde } = req.params;
  const query = { status: "incomplete" };

  const [total, tasks] = await Promise.all([
    Tasks.countDocuments(query),
    Tasks.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);

  res.status(200).json({
    total,
    tasks,
  });
};

export const taskPost = async (req, res) => {
  const { name, description, startDate, endDate, creator_name } = req.body;
  const tasks = new Tasks({
    name,
    description,
    startDate,
    endDate,
    creator_name,
  });

  await tasks.save();

  res.status(200).json({
    tasks,
  });
};


export const taskUpdate = async (req, res) => {
  try {
    const { name, description, startDate, endDate, creator_name } = req.body;
    const { id } = req.params;
    const task = await Tasks.findById(id); // Cambiado de 'tasks' a 'task'

    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    if (name) task.name = name;
    if (description) task.description = description;
    if (startDate) task.startDate = startDate;
    if (endDate) task.endDate = endDate;
    if (creator_name) task.creator_name = creator_name;

    await task.save();

    return res.status(200).json({
      msg: 'The task has been updated',
      task,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send('The task has not been updated');
  }
};


export const taskDelete = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Tasks.findByIdAndUpdate(id, {status: "complete"});
    res.status(200).json({
      msg: "The task has been delete",
      task
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send("The task has not ben elemete");
  }
};
