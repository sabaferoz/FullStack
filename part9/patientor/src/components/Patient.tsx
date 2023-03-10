import {
  // ...
  useParams
} from 'react-router-dom'
import { DiagnosesEntry, Patient } from '../types'

interface Props{
    patients: Patient[]
    diagnoses:DiagnosesEntry[]
}
const PatientComponent = ({ patients, diagnoses }: Props) => {
  const id = useParams().id
  const patient = patients.find(p => p.id ===id)
  if(patient){
  return (
    
    <div>
      <h2>{patient.name}</h2>
      <div>Dob: {patient.dateOfBirth}</div>
      <div>Occupation: {patient.occupation}</div>
      <h3>entries</h3>
      {patient.entries.map(entry=>{
        return(
        <>
        <p>{entry.date}  {entry.description}</p>
        <ul>
          {entry.diagnosisCodes?entry.diagnosisCodes.map(code=>{
            const entry=diagnoses.find(v=>v.code===code);
            const toDisplay=code + " " + entry?.name;
          return(<li key={toDisplay}>{toDisplay} </li>)
        }):null}
        </ul>
        
        </>)
      })}
      
    </div>
    
  )

  
  }
  return(<div>Patient not found</div>)
}

export default PatientComponent