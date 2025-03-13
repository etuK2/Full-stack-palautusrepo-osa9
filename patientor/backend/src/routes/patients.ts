import express, { Request, Response, NextFunction } from 'express';
import patientService from '../services/patientService';
import { z } from 'zod';
import { NewPatientEntry, Patient } from '../types';
import { toNewEntry, toNewPatientEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req ,res) => {
  res.send(patientService.getPatientById(req.params.id));
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    toNewPatientEntry.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => { 
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatientEntry>, res: Response<Patient>) => {
  const addedEntry = patientService.addPatient(req.body);
  res.json(addedEntry);
});

router.post('/:id/entries', (req: Request, res: Response) => {
  try {
      const newEntry = toNewEntry(req.body);
      const addedEntry = patientService.addEntry(req.params.id, newEntry);

      res.json(addedEntry);
  }
  catch (error: unknown) {
      if (error instanceof Error) {
          res.status(400).json({ error: error.message });
      } else {
          res.status(400).json({ error: "Unknown error occurred" });
      }
  }
});

router.use(errorMiddleware);

export default router;