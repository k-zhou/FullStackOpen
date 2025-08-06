import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.static("./dist"));

const PORT = process.env.FRONTEND_PORT;

app.listen(PORT, () => {
  console.log(`Frontend server running on port ${PORT}.`);
});