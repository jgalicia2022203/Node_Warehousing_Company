'strick'

import { response, request } from "express";
import Tasks from './task.model.js';

export const taskGet = async (req = request, res = response) =>{
    const {limite, desde} = req.params;
    const query = {status: 'incomplete'}
 
    const [total, tasks] = await Promise.all([
        Tasks.countDocuments(query),
        Tasks.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ])
 
    res.status(200).json({
        total,
        tasks
    })
}

export const taskPost = async (req, res) => {
    const { name, description, startDate, endDate,creator_name } = req.body;
    const tasks = new Tasks ({ name, description, startDate, endDate,creator_name });

    await tasks.save();

    res.status(200).json({
        tasks
    });
}

