import axios from 'axios'
import { useEffect, useState } from "react"


export const useSportseeAPI = () => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([]) 
  const [error, setError] = useState(undefined)

useEffect(()=> {
  const load = async () => {
    try {
      const response = await axios.get('http://localhost:3000/user/12')
      //const dataUser = await response.json()
      const dataUser = response.data
      console.log('data',dataUser)
      setData(dataUser)
      setLoading(false)
    } catch (err) {
      //console.log('error', err)
      setError(err)
      setLoading(false)
    }
  }
load()
}, [])


  return {
    loading,
    data,
    error
  }
}
