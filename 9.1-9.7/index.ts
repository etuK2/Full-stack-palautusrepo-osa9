/* eslint-disable @typescript-eslint/no-unsafe-argument */
import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());


app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!height || !weight || isNaN(height) || isNaN(weight)) {
    res.status(400).send({ error: 'malformatted parameters' });
    return;
  }

  const bmi = calculateBmi(height, weight);
  res.status(200).send({ weight, height, bmi });
});


app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || target === undefined) {
    res.status(400).send({ error: "parameters missing" });
    return;
  }

  if (!Array.isArray(daily_exercises) || isNaN(target)) {
    res.status(400).send({ error: "malformatted parameters" });
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (daily_exercises.some((exercise: any) => isNaN(exercise))) {
    res.status(400).send({ error: "malformatted parameters" });
    return;
  }

  const result = calculateExercises(daily_exercises, target);
  res.status(200).send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});