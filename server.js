import express from "express";
import routes from "./routes/index.js";

const app = express();

import { handler } from "./frontend/build/handler.js";

app.use("/api", routes);

app.use("/", handler);
app.listen(80, () => {
  console.log("App up");
});
