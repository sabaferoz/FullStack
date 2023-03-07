import express from "express";
const app = express();
import { calculateBmi } from "./bmiCalculators";

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi/:height/:weight", (req, res) => {
  if (isNaN(Number(req.params.height)) || isNaN(Number(req.params.weight)))
    res.send({ error: "malformed parameters" });
  const height = Number(req.params.height);
  const weight = Number(req.params.weight);
  const bmi = calculateBmi(height, weight);
  const resp = { weight, height, bmi };
  res.send(resp);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
