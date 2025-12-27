import jwt from "jsonwebtoken";
import { ApiError } from "../utils/apiError.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../models/userModel.js";

const verifyUser = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            throw new ApiError(401, "Access token not found");
        }

        let decodedToken;
        try {
            decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        } catch (err) {
            throw new ApiError(401, "Access token invalid");
        }

        const user = await User.findById(decodedToken._id);

        if (!user) {
            throw new ApiError(401, "Invalid or expired access token");
        }

        req.user = user;
        next();
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            throw new ApiError(401, "Access token expired");
        }
        throw new ApiError(401, "Unauthorized request");
    }
})

export default verifyUser