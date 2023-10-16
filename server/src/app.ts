import express from "express";
import { parseSQL } from "./ctrls/sqlCtrl";
import cors from "cors";
const app = express();
const PORT = 3333;
app.use(cors());
app.use(express.json());

app.post("/parse", parseSQL);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
