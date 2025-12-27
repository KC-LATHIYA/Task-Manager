import z from "zod";

const signupSchema = z.object({
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
});

export default signupSchema