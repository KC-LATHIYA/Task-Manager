import e from "express";
import {
    getAllTasks,
    getAllUsers,
    createTask,
    updateTask,
    deleteTask,
    getTaskById
} from "../controller/adminController.js";
import verifyUser from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";


const routes = e.Router();

routes.get("/all-tasks", verifyUser, authorizeRoles("admin"), getAllTasks);
routes.get("/all-users", verifyUser, authorizeRoles("admin"), getAllUsers);
routes.get("/task/:id", verifyUser, authorizeRoles("admin"), getTaskById);
routes.post("/create", verifyUser, authorizeRoles("admin"), createTask);
routes.patch("/update/:id", verifyUser, authorizeRoles("admin"), updateTask);
routes.delete("/delete/:id", verifyUser, authorizeRoles("admin"), deleteTask);

export const adminRoutes = routes