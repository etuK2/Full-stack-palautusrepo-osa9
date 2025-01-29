import { z } from 'zod';
import newEntrySchema from './utils';

export interface Diagnose {
    code: string,
    name: string,
    latin?: string
}

export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: Gender,
    occupation: string
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatientEntry = z.infer<typeof newEntrySchema>;

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
}
