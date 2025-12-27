import e from "express";
import {
    getMyTaskById,
    getMyTasks,
    updateTaskStatus
} from "../controller/employeController.js";
import verifyUser from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const routes = e.Router();

routes.get("/my-tasks", verifyUser, authorizeRoles("user"), getMyTasks);
routes.get("/task/:id", verifyUser, authorizeRoles("user"), getMyTaskById);
routes.patch("/task/:id", verifyUser, authorizeRoles("user"), updateTaskStatus);

export const employeRoutes = routes