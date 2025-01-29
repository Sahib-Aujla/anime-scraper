import express from "express";
import cors from "cors";
import apiRoutes from "./routes/index.js";
const app = express();
app.use(cors());

app.get("api/", apiRoutes);

app.listen(8080, () => {
  console.log("listening on port 8080");
});
