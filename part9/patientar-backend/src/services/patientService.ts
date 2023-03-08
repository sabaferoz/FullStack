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
  ({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  })
);

const getEntries = (): PatientEntryWithoutSsn[] => {
  console.log(patientsWithoutSsn);
  return patientsWithoutSsn;
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
};
