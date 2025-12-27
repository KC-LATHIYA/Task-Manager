import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import { userRoutes } from "./routes/userRoutes.js";
import { adminRoutes } from "./routes/adminRoutes.js";
import { employeRoutes } from "./routes/employeRoutes.js";

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }))
app.use(cookieParser());
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));
app.use(express.static("public"));

app.use("/auth", userRoutes);
app.use("/admin", adminRoutes);
app.use("/employe", employeRoutes);

export default app
