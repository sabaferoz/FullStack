"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const toNewPatientEntry = (object) => {
    if (!object || typeof object !== "object") {
        throw new Error("Incorrect or missing data");
    }
    if ("name" in object &&
        "dateOfBirth" in object &&
        "occupation" in object &&
        "ssn" in object &&
        "gender" in object) {
        const newEntry = {
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
const parseStringField = (field) => {
    if (!field || !isString(field)) {
        throw new Error("Incorrect or missing field");
    }
    return field;
};
const isString = (text) => {
    return typeof text === "string" || text instanceof String;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const parseDate = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error("Incorrect or missing date: " + date);
    }
    return date;
};
const isGender = (param) => {
    return Object.values(types_1.Gender)
        .map((v) => v.toString())
        .includes(param);
};
const parseGender = (gender) => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error(`Incorrect or missing gender: ${gender}`);
    }
    return gender;
};
exports.default = toNewPatientEntry;
