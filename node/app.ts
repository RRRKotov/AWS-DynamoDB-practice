import express, { Router } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { entityRoute } from "./routes/entityRoute";
// import { getE}
// require("dotenv").config();
// const creationRoute = require("./routes/creation");
// const editingRoute = require("./routes/editing");
// const getentitylistRoute = require("./routes/getentitylist");

const port = 5000;
const app = express();
const router = Router();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/entity", [entityRoute]);

// app.use("/creation", creationRoute);
// app.use("/editing", editingRoute);
// app.use("/getentitylist", getentitylistRoute);
// app.use("/getentity", getentityRoute);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
