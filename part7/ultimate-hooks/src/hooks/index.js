import axios from 'axios'
import { useState, useEffect } from 'react'
const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect( ()=> {
    
    
   getAll() 
 
  },[setResources,baseUrl])
  
  console.log(baseUrl)

  const getAll = async() => {
    console.log("get all called")
    const response = await axios.get(baseUrl)
    console.log(response.data.map(resource=>console.log("resource",resource)))
    setResources(response.data)
    return response.data
    
  }

  const create = async(resource) => {
    console.log("create called")
    
    const response = await axios.post(baseUrl, resource)
    console.log(response.data)
    
    setResources(resources.concat(response.data))
    return response.data
  }


  const service = {
    create
  }

  return [
    resources, service
  ]
}

export default useResource