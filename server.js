import express from "express";
import routes from "./routes/index.js";

import session from "express-session";

import { createProxyMiddleware } from "http-proxy-middleware";

import { handler } from "./frontend/build/handler.js";

const app = express();

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true
  })
);

app.use("/api", routes);

if (process.env.DEV == "true") {
  app.use(
    "*",
    createProxyMiddleware({
      target: "http://localhost:5173",
      changeOrigin: true
    })
  );
} else {
  app.use("/", handler);
}

app.listen(80, () => {
  console.log("App up");
});
