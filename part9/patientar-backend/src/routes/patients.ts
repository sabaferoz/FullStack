import express from "express";
import patientService from "../services/patientService";
import toNewPatientEntry from "../utils";

const patientsRouter = express.Router();

patientsRouter.get("/", (_req, res) => {
  console.log(patientService.getEntries());
  res.send(patientService.getEntries());
});

patientsRouter.post("/", (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedPatientEntry = patientService.addPatient(newPatientEntry);
    res.send(addedPatientEntry);
  } catch (error) {
    let errorMessage = "Failed to add a new patient";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.log(errorMessage);
  }
});

export default patientsRouter;
