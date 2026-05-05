const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const config = require("./utils/config");
const middleware = require("./utils/middleware");
const blogRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");

const app = express();

const mongoUrl = config.MONGODB_URI;
mongoose
  .connect(mongoUrl, { family: 4 })
  .then(() => console.log("Connesso a MongoDB"))
  .catch((err) => console.error("Errore di connessione:", err));

app.use(express.json());
morgan.token("body", (req, res) => {
  const body = { ...req.body };

  if (body.password) {
    body.password = "***";
  }

  return JSON.stringify(body);
});
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body"),
);

app.use(middleware.tokenExtractor);

app.use("/api/blogs", middleware.userExtractor, blogRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}

if (process.env.NODE_ENV === "production") {
  const distPath = path.join(__dirname, "../bloglist-frontend/dist");
  app.use(express.static(distPath));

  app.get(/^(?!\/api).*/, (req, res) => {
    if (req.url.startsWith("/api")) {
      res.sendFile(path.join(distPath, "index.html"));
    }
  });
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
