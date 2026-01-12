import e from "express";
import cors from "cors";
import userRouter from "./api/routes/user.js";
import mongoRouter from "./api/routes/mongo.js";
import dbConfig from "./config/mongoDBConfig.js";

const app = e();

// Enable CORS for all origins
app.use(cors());

// Middleware to parse JSON request bodies
app.use(e.json());

// Connect to MongoDB on startup
dbConfig.connectDB().catch(err => {
  console.error("Failed to connect to MongoDB:", err);
  process.exit(1);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/users", userRouter);
app.use("/mongo", mongoRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});