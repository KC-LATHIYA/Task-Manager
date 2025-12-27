import Task from "../models/taskModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

const getMyTasks = asyncHandler(async (req, res) => {
    const tasks = await Task.find({ assignedTo: req.user._id })
        .populate("createdBy", "username email")
        .sort("-createdAt");

    res.status(200)
        .json(
            new ApiResponse(
                200,
                tasks,
                "All Assigned tasks fetched successfully"
            )
        );
});

const getMyTaskById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const task = await Task.findOne({
        _id: id,
        assignedTo: req.user._id
    }).populate("createdBy", "username");

    if (!task) {
        throw new ApiError(404, "Task not found");
    }

    res.status(200)
        .json(
            new ApiResponse(
                200,
                task,
                "Task details fetched successfully"
            )
        );
});

const updateTaskStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const task = await Task.findOneAndUpdate(
        { _id: id, assignedTo: req.user._id },
        { $set: { status } },
        { new: true }
    );

    if (!task) {
        throw new ApiError(404, "Task not found");
    }

    res.status(200)
        .json(
            new ApiResponse(
                200,
                task,
                `Task status updated to ${status}`
            )
        );
});

export {
    getMyTasks,
    getMyTaskById,
    updateTaskStatus
}