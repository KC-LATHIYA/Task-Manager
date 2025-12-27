import { ApiError } from "../utils/apiError.js";

export const validation = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        throw new ApiError(409, "Validation Failed!")
    }
}
