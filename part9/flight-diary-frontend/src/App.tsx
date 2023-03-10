import { useEffect, useState } from "react";
import { VisibilityEnum,WeatherEnum, EntryInterface } from "./types";
import axios, { AxiosError } from 'axios'

const App = () => {
  const[date,setNewDate]=useState("")
  const[visibility,setVisibility]=useState<VisibilityEnum>(VisibilityEnum["great"])
  const[weather,setWeather]=useState<WeatherEnum>(WeatherEnum["sunny"])
  const[comment,setNewComment]=useState("")
  const[entries,setAllEntries] = useState<EntryInterface[]>([{id: "1", date:"12-12-2003", visibility: VisibilityEnum["great"], weather: WeatherEnum["sunny"], comment: "" }])
  const[errorMessage,setErrorMessage]=useState("")
  const[successMessage,setSuccessMessage]=useState("")


  useEffect(() => {
    axios.get('http://localhost:3001/api/diaries').then(response => {
      console.log(response.data);
      setAllEntries(response.data);
    })
  }, [])

 const addEntry = () =>{
  console.log(date, weather,visibility,comment)
   console.log("entry", { "date": date,"weather": weather,"visibility":visibility,"comment":comment })
    try {
   axios.post<EntryInterface>('http://localhost:3001/api/diaries', {date, weather,visibility,comment})
      .then(response => {
        setAllEntries(entries.concat(response.data))
      })} catch (e) {
    const error = e as AxiosError;
    console.log(error, error.message)
    setErrorMessage(error.message)
    setTimeout(() => {
          setErrorMessage("")
        }, 5000)
  }

      
 }

 interface NotifyProps{
  errorMessage:string;
  successMessage:string;
 }
 const Notify = (props:NotifyProps)=> {
  const errorMessage=props.errorMessage
  const successMessage=props.successMessage
  if ( !errorMessage && !successMessage ) {
    return <div></div>
  }
  if(errorMessage){
  return (
    <div style={{color: 'red'}}>
    {errorMessage}
    </div>
  )
  }
  if(successMessage){
  return (
    <div style={{color: 'green'}}>
    {successMessage}
    </div>
  )
  }
  return <div></div>
}

  return (
    <div>
      <h2>Add new entry</h2>
      <Notify errorMessage={errorMessage} successMessage={successMessage}></Notify>
     <form >
      date 
      <input type="date" value={date} onChange={(event) => setNewDate(event.target.value)} 
        />
        <br/>
        Visibility
         <fieldset>
          <label>
            great
         <input
         name="visibility"
            type="radio"
            value="great"
            onChange={(event) => setVisibility(event.target.value as VisibilityEnum)}
            
          />
          </label>
          <label>
            good
          <input
           name="visibility"
            type="radio"
            value="good"
            onChange={(event) => setVisibility(event.target.value as VisibilityEnum)}
          />
          
          </label>
          <label>
            ok
          <input
           name="visibility"
            type="radio"
            value="ok"
            onChange={(event) => setVisibility(event.target.value as VisibilityEnum)}
          />
          </label>
          <label>
            poor
          <input
           name="visibility"
            type="radio"
            value="poor"
            onChange={(event) => setVisibility(event.target.value as VisibilityEnum)}
          />
          </label>
          
        
        </fieldset>
        Weather

        <fieldset>
          <label>
            sunny
         <input
          name="weather"
            type="radio"
            value="sunny"
            onChange={(event) => setWeather(event.target.value as WeatherEnum)}
          />
          
          </label>
          <label>
            rainy
          <input
          name="weather"
            type="radio"
            value="rainy"
            onChange={(event) => setWeather(event.target.value as WeatherEnum)}
          />
          </label>
          <label>
            cloudy
          <input
          name="weather"
            type="radio"
            value="cloudy"
            onChange={(event) => setWeather(event.target.value as WeatherEnum)}
          />
          </label>
          <label>
            stormy
          <input
          name="weather"
            type="radio"
            value="stormy"
            onChange={(event) => setWeather(event.target.value as WeatherEnum)}
          />
          </label>
          <label>
            windy
          <input
          name="weather"
            type="radio"
            value="windy"
            onChange={(event) => setWeather(event.target.value as WeatherEnum)}
          />
          </label>
          </fieldset>
          Comment  <input type="text" value={comment} onChange={(event) => setNewComment(event.target.value)} />
        <button type='button' onClick={addEntry}>add</button>
     </form>
     <div>
      <h2>Diary entries</h2>
      <div>
      <ul>
        {entries.map(entry =>
          <li key={entry.id}><strong>{entry.date}</strong> visibility:{entry.visibility} weather:{entry.weather}</li>
        )}
      </ul>
    </div>
     </div>
    </div>
  );
};

export default App;