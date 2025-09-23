import e from "express";
import userRouter from "./api/routes/user.js";
import supaRouter from "./api/routes/supa.js";

const app = e();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/users", userRouter);
app.use("/supa", supaRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});