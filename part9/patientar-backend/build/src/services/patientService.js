"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __importDefault(require("../utils"));
const patients_1 = __importDefault(require("../../data/patients"));
const uuid_1 = require("uuid");
const patients = patients_1.default.map((obj) => {
    const object = (0, utils_1.default)(obj);
    object.id = obj.id;
    return object;
});
const patientsWithoutSsn = patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
}));
const getEntries = () => {
    console.log(patientsWithoutSsn);
    return patientsWithoutSsn;
};
const addPatient = (patientObject) => {
    const id = (0, uuid_1.v1)();
    const newEntry = Object.assign({ id }, patientObject);
    patients.push(newEntry);
    return newEntry;
};
exports.default = {
    getEntries,
    addPatient,
};
