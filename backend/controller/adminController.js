import Task from "../models/taskModel.js";
import User from "../models/userModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

const getAllTasks = asyncHandler(async function (req, res) {
    const tasks = await Task.find()
        .populate("assignedTo", "username email")
        .populate("createdBy", "username");

    res.status(200)
        .json(
            new ApiResponse(
                200,
                tasks,
                "All tasks fetched successfully"
            )
        );
});

const getTaskById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const task = await Task.findById(id)
        .populate("assignedTo", "username email role")
        .populate("createdBy", "username email");

    if (!task) {
        throw new ApiError(404, "Task not found");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            task,
            "Task fetched successfully"
        )
    );
});

const getAllUsers = asyncHandler(async function (req, res) {
    const users = await User.find({ role: "user" }).select("-refreshToken");

    res.status(200)
        .json(
            new ApiResponse(
                200,
                users,
                "Users fetched successfully"
            )
        );
});

const createTask = asyncHandler(async function (req, res) {
    const { title, description, assignedTo, priority, dueDate } = req.body;


    if (!title || !description || !assignedTo || !priority || !dueDate) {
        throw new ApiError(400, "Title, Description, Assigned User, Priority and DueDate are required");
    }

    const userExists = await User.findById(assignedTo);

    if (!userExists) {
        throw new ApiError(404, "The user you are assigning this task to does not exist");
    }

    const task = await Task.create({
        title,
        description,
        assignedTo,
        createdBy: req.user._id,
        priority: priority || "medium",
        dueDate
    });

    res.status(201)
        .json(
            new ApiResponse(
                201,
                task,
                "Task created successfully"
            )
        );
});

const updateTask = asyncHandler(async function (req, res) {
    const { id } = req.params;

    const task = await Task.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true, runValidators: true }
    );

    if (!task) {
        throw new ApiError(404, "Task not found");
    }

    res.status(200)
        .json(
            new ApiResponse(
                200,
                task,
                "Task updated successfully"
            )
        );
});

const deleteTask = asyncHandler(async function (req, res) {
    const { id } = req.params;

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
        throw new ApiError(404, "Task not found");
    }

    res.status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "Task deleted successfully"
            )
        );
});

export {
    getAllTasks,
    getTaskById,
    getAllUsers,
    createTask,
    updateTask,
    deleteTask
}