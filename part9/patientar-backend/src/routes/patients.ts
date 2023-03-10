import express from "express";
import patientService from "../services/patientService";
const patientsRouter = express.Router();
import toNewPatientEntry from "../utils";

patientsRouter.get("/", (_req, res) => {
  res.send(patientService.getEntries());
});

patientsRouter.get("/:id", (req, res) => {
  console.log("get entries for id", patientService.getEntry(req.params.id));
  res.send(patientService.getEntry(req.params.id));
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
