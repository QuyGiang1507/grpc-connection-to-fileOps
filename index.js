import express from "express";
import { fileRouter } from "./route/fileOps.route.js";
const app = express();

app.use(fileRouter);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
