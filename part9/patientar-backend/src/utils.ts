import { Gender, NewPatientEntry } from "./types";

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "occupation" in object &&
    "ssn" in object &&
    "gender" in object
  ) {
    const newEntry: NewPatientEntry = {
      name: parseStringField(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      occupation: parseStringField(object.occupation),
      ssn: parseStringField(object.ssn),
      gender: parseGender(object.gender),
    };

    return newEntry;
  }
  throw new Error("Incorrect data: some fields are missing");
};

const parseStringField = (field: unknown): string => {
  if (!field || !isString(field)) {
    throw new Error("Incorrect or missing field");
  }
  return field;
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender}`);
  }
  return gender;
};

export default toNewPatientEntry;
