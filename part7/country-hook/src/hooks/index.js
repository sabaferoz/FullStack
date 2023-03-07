import  { useState, useEffect } from 'react'

import axios from 'axios'
const useCountry = (name) => {
  const [country, setCountry] = useState(null)
console.log("name", name)
  useEffect( ()=> {
    
    axios.get(`https://restcountries.com/v2/name/${name}?fullText=true`)
    .then(response=> setCountry(response.data))
    
 
  },[name])
  console.log("country after useeffect under hook", country)
  if ( name === '') {
        return null
    }

    if (!country) {
        return []
    }
  return country
}

export default useCountry