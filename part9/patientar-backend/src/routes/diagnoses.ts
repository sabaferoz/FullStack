import express from "express";
import diagnosesService from "../services/diagnosesService";

const diagnosesRouter = express.Router();

diagnosesRouter.get("/", (_req, res) => {
  res.send(diagnosesService.getEntries());
});

diagnosesRouter.post("/", (_req, res) => {
  res.send("Saving a diary!");
});

export default diagnosesRouter;
