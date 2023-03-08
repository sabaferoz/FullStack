import { DiagnosesEntry } from "../types";

import diagnosesData from "../../data/diagnoses";

const diagnoses: DiagnosesEntry[] = diagnosesData;

const getEntries = (): DiagnosesEntry[] => {
  return diagnoses;
};

export default {
  getEntries,
};
