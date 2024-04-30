import { Router } from "express";
import { check } from "express-validator";

import { taskDelete, taskGet, taskPost, taskUpdate } from "./task.controller.js";

import { tasksExist } from "../common/helpers/db-validators.js";
import {} from "../common/middlewares/validate-fields.js";

const router = Router();

router.get("/", taskGet);

router.post(
  "/",
  [
    check("name").custom(tasksExist),
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
    check("startDate", "startDate is required").not().isEmpty(),
    check("endDate", "endDate is required").not().isEmpty(),
    check("creator_name", "The creator is required").not().isEmpty(),
  ],
  taskPost
);

router.put(
  "/:id", 
  [
    check("id", "The id is not valid").isMongoId(),
    check("Creator_name").optional(), 
  ],
  taskUpdate
);


router.delete(
  "/:id",
  [
    check("id", "The id is required").not().isEmpty(),
    check("creador", "The Creator_Name is required").not().isEmpty(),
  ],
  taskDelete
);

export default router;
