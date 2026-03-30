import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import routes from "./routes";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (_req, res) => {
  return res.status(200).json({ status: "ok" });
});

app.use("/api", routes);

export default app;

