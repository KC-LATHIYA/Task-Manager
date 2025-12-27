import e from "express";
import {
    loginUser,
    registerUser,
    refreshAccessToken,
    logoutUser,
    getCurrentUser,
} from "../controller/userController.js";
import verifyUser from "../middleware/authMiddleware.js";
import { validation } from "../middleware/validation.js";
import signinSchema from "../middleware/signinSchema.js";
import signupSchema from "../middleware/signupSchema.js";

const routes = e.Router();

routes.post("/login", validation(signinSchema), loginUser);
routes.post("/register", validation(signupSchema), registerUser);
routes.post("/refresh-access", verifyUser, refreshAccessToken);
routes.post("/logout", verifyUser, logoutUser);
routes.get("/me", verifyUser, getCurrentUser);

export const userRoutes = routes