"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const utils_1 = __importDefault(require("../utils"));
const patientsRouter = express_1.default.Router();
patientsRouter.get("/", (_req, res) => {
    console.log(patientService_1.default.getEntries());
    res.send(patientService_1.default.getEntries());
});
patientsRouter.post("/", (req, res) => {
    try {
        const newPatientEntry = (0, utils_1.default)(req.body);
        const addedPatientEntry = patientService_1.default.addPatient(newPatientEntry);
        res.send(addedPatientEntry);
    }
    catch (error) {
        let errorMessage = "Failed to add a new patient";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        console.log(errorMessage);
    }
});
exports.default = patientsRouter;
