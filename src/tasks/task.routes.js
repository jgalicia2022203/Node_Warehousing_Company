import { Router } from "express";
import { check } from "express-validator";

import {
    taskPost
} from "./task.controller.js";

import {tasksExist} from "../common/helpers/db-validators.js";
import {  } from "../common/middlewares/validate-fields.js";

const router = Router();


router.get("/", taskGet)

router.post(
    "/",
    [
    check("name").custom(tasksExist),
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
    check("startDate", "startDate is required").not().isEmpty(),
    check("endDate","endDate is required").not().isEmpty(),
    check("creator_name", "The creator is required").not().isEmpty(),
    
    ],
    taskPost
);

export default router;