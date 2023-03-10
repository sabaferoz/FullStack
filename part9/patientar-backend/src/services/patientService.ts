import {
  PatientEntryWithoutSsn,
  PatientEntry,
  NewPatientEntry,
} from "../types";

import toNewPatientEntry from "../utils";

import patientData from "../../data/patients";
import { v1 as uuid } from "uuid";

const patients: PatientEntry[] = patientData.map((obj) => {
  const object = toNewPatientEntry(obj) as PatientEntry;
  object.id = obj.id;
  return object;
});

const patientsWithoutSsn: PatientEntryWithoutSsn[] = patients.map(
  ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries,
  })
);

const getEntries = (): PatientEntryWithoutSsn[] => {
  return patientsWithoutSsn;
};

const getEntry = (id: string): PatientEntry | undefined => {
  return patients.find((patient) => patient.id === id);
};

const addPatient = (patientObject: NewPatientEntry) => {
  const id: string = uuid();
  const newEntry: PatientEntry = {
    id,
    ...patientObject,
  };
  patients.push(newEntry);
  return newEntry;
};

export default {
  getEntries,
  addPatient,
  getEntry,
};
