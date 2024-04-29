'strick'

import { response, request } from "express";
import Tasks from './task.model.js';

export const taskPost = async (req, res) => {
    const { name, description, startDate, endDate,creator_name } = req.body;
    const tasks = new Tasks ({ name, description, startDate, endDate,creator_name });

    await tasks.save();

    res.status(200).json({
        tasks
    });
}

