import app from "./app.js";
import connectDB from "./db/db.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`⚙️  Server is running at port : ${PORT}`);
        })
    })
    .catch((err) => {
        console.log("MONGO db connection failed !!! ", err);
    });