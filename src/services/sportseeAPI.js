import axios from 'axios'
import { useEffect, useState } from "react"
import { returnURL } from './adresses'


export const useSportseeAPI = (user, type) => {
  const url = returnURL(user,type)
  //console.log('url BACKEND', url)
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([]) 
  const [error, setError] = useState(undefined)

useEffect(()=> {
  const load = async () => {
    try {
      const response = await axios.get(url)
      //const dataUser = await response.json()
      const dataUser = response.data
      //console.log('data',dataUser)
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
