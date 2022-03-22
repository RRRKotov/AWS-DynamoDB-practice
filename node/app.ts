import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { entityRoute } from "./routes/entityRoute";

const port = 5000;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/entity", [entityRoute]);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
