import express from "express";
// import cors from "cors";
import * as bodyParser from "body-parser";
import * as dotenv from "dotenv";

import routes from "./routes";
import { db } from "./config";
dotenv.config();

let app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cors());

//Todo Some middlewares here
app.use("/api/students", routes.students);
app.use("/api/projects", routes.projects);

// DB connection
db();
app.listen(PORT, () => {
  console.log("Server runnig on the port " + PORT);
});
