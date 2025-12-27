import User from "../models/userModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import jwt from "jsonwebtoken";

const generateRefreshAndAccessToken = async (userid) => {

    const user = await User.findById(userid)

    const refreshToken = await user.generateRefreshToken();
    const accessToken = await user.generateAccessToken();

    user.refreshToken = refreshToken
    await user.save({ validateBeforeSave: false });

    return {
        refreshToken,
        accessToken
    }

}

const loginUser = asyncHandler(async function (req, res) {
    const { email, password } = req.body

    if (!email || !password) {
        throw new ApiError(400, "Please Fill All The Details")
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        throw new ApiError(400, "User Not Found")
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid Password");
    }

    const { accessToken, refreshToken } = await generateRefreshAndAccessToken(user._id);

    const option = {
        httpOnly: true,
        secure: true
    }

    const loginUser = await User.findById(user._id);

    if (!loginUser) {
        throw new ApiError(400, "Something went wrong while login the user")
    }

    res.status(200)
        .cookie("accessToken", accessToken, option)
        .cookie("refreshToken", refreshToken, option)
        .json(
            new ApiResponse(
                200,
                { accessToken, refreshToken, loginUser },
                "User Login Successfully"
            )
        )
});

const registerUser = asyncHandler(async function (req, res) {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
        throw new ApiError(400, "Please Fill All The Details")
    }

    const existUserEmail = await User.findOne({ email });
    const existUserUsername = await User.findOne({ username });

    if (existUserEmail) {
        throw new ApiError(400, "User With This Email Already Existed")
    }

    if (existUserUsername) {
        throw new ApiError(400, "User With This Username Already Existed")
    }

    const user = await User.create({
        username,
        email,
        password,
    });

    const createdUser = await User.findOne(user._id);

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    res.status(200)
        .json(
            new ApiResponse(
                200,
                createdUser,
                "User Created Successfully"
            )
        )
});

const refreshAccessToken = asyncHandler(async function (req, res) {
    const incomeingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomeingRefreshToken) {
        throw new ApiError(401, "Unauthorized User !");
    }

    const decoded = jwt.verify(incomeingRefreshToken, process.env.REFRESH_TOKEN_SECRET);

    const user = await User.findById(decoded._id).select("+refreshToken");

    if (!user) {
        throw new ApiError(401, "Unauthorized User");
    }

    if (incomeingRefreshToken !== user.refreshToken) {
        throw new ApiError(401, "RefreshToken Expired Or Used");
    }

    const { accessToken, refreshToken: newRefreshToken } = await generateRefreshAndAccessToken(user._id);

    const option = {
        httpOnly: true,
        secure: true
    }

    res.status(200)
        .cookie("accessToken", accessToken, option)
        .cookie("refreshToken", newRefreshToken, option)
        .json(
            new ApiResponse(
                200,
                {
                    accessToken,
                    newRefreshToken
                },
                "AccessToken And RefreshToken Changed Successfully"
            )
        )

});

const logoutUser = asyncHandler(async function (req, res) {
    const option = {
        httpOnly: true,
        secure: true,
    };

    const userId = req.user?._id;

    if (!userId) {
        throw new ApiError(401, "User not authenticated for logout");
    }

    const user = await User.findById(userId);

    if (user) {
        user.refreshToken = undefined;
        await user.save({ validateBeforeSave: false });
    }

    res.status(200)
        .clearCookie("accessToken", option)
        .clearCookie("refreshToken", option)
        .json(new ApiResponse(200, {}, "User Logout Successfully"));
});

const getCurrentUser = asyncHandler(async function (req, res) {
    const userId = req.user?._id;

    if (!userId) {
        throw new ApiError(401, "Unauthorized or invalid token");
    }

    const user = await User.findById(userId);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    res.status(200).json(
        new ApiResponse(
            200,
            user,
            "User fetched successfully"
        )
    );
});

export {
    loginUser,
    registerUser,
    refreshAccessToken,
    logoutUser,
    getCurrentUser,
}