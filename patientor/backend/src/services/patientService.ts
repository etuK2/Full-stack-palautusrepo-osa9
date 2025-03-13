import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';
import { Patient, NonSensitivePatientEntry, NewPatientEntry, Entry, EntryWithoutId} from '../types';

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};


const addPatient = ( entry: NewPatientEntry ): Patient => {
    const newPatientEntry = {
    id: uuid(),
    ...entry,
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntry = (patientId: string, entry: EntryWithoutId): Entry => {
  const newId: string = uuid();
  const newEntry = {
      id: newId,
      ...entry
  };
  const id: number = patients.findIndex((patient) => patientId === patient.id);
  if (id === -1) {
      throw Error("Patient not found");
  }
  else {
      patients[id].entries.push(newEntry);
      return newEntry;
  }
};

const getPatientById = (id: string ): Patient | undefined => {
  const patient = patients.find(patient => patient.id === id);
  return patient;
};

export default {
  getNonSensitiveEntries,
  addPatient,
  getPatientById,
  addEntry,
};