//8. to intall express here you must go to the http-backend folder and run pnpm add express @types/express
import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello, world!");
});
app.listen(3001);
