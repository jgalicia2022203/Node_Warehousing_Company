import { Router } from "express";
import { check } from "express-validator";
import { existTaskById, tasksExist } from "../common/helpers/db-validators.js";
import { validateFields } from "../common/middlewares/validate-fields.js";
import {
  completeTask,
  createTask,
  deleteTask,
  editTask,
  listTasks,
} from "./task.controller.js";

const router = Router();

router.get("/", listTasks);

router.post(
  "/",
  [
    check("name", "name is required").not().isEmpty(),
    check("name").custom(tasksExist),
    check("description", "description is required").not().isEmpty(),
    check("endDate", "end date is required").not().isEmpty(),
    check("creator_name", "The creator name is required").not().isEmpty(),
    validateFields,
  ],
  createTask
);

router.put(
  "/:id",
  [
    check("id", "The id is not valid").isMongoId(),
    check("id").custom(existTaskById),
    check("name").custom(tasksExist),
    validateFields,
  ],
  editTask
);

router.patch(
  "/:id",
  [
    check("id", "The id is not valid").isMongoId(),
    check("id").custom(existTaskById),
    validateFields,
  ],
  completeTask
);

router.delete(
  "/:id",
  [
    check("id", "The id is not valid").isMongoId(),
    check("id").custom(existTaskById),
    validateFields,
  ],
  deleteTask
);

export default router;
