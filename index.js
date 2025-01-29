import express from "express";
import cors from "cors";
import apiRoutes from "./routes/index.js";
const app = express();
app.use(cors({allow:'*'}));

app.use("/api", apiRoutes);

app.listen(8080, () => {
  console.log("listening on port 8080");
});
