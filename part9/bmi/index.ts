import express from "express";
const app = express();
import { calculateBmi } from "./bmiCalculators";
import { calculateExercises } from "./exerciseCalculator";
import { arrToNumArr, hasNaN } from "./helper";
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi/:height/:weight", (req, res) => {
  if (isNaN(Number(req.params.height)) || isNaN(Number(req.params.weight)))
    return res.status(400).send({ error: "malformed parameters" });
  const height = Number(req.params.height);
  const weight = Number(req.params.weight);
  const bmi = calculateBmi(height, weight);
  const resp = { weight, height, bmi };
  return res.send(resp);
});

app.post("/exercises", (req, res) => {
  console.log(req.body);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target)
    return res.status(400).send({ error: "parameters missing" });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  if (hasNaN(daily_exercises))
    return res.status(400).send({ error: "malformed parameters" });

  if (isNaN(Number(target)))
    return res.status(400).send({ error: "malformed parameters" });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const exerciseHours = arrToNumArr(daily_exercises);

  const result = calculateExercises(exerciseHours, Number(target));
  return res.send({ result });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
