import axios from 'axios'
import { useEffect, useState } from "react"
import { returnURL } from './adresses'


export const useSportseeAPI = (user, source, type) => {
  const url = returnURL(user,source, type)
  //console.log('url', url, source,type)
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([]) 
  const [error, setError] = useState(undefined)
  //console.log('load async')

useEffect(()=> {
  //console.log('useeffect')
  const load = async () => {
    try {
      //console.log('asdert')
      const response = await axios.get(url)
      //console.log('reponse', response)
      //const dataUser = await response.json()
      //new Promise((r) => setTimeout(r, 4000))
      let dataUser
      if(source==='BACKEND'){
        dataUser = response.data.data
      }
      else {
        dataUser = response.data
      }
      //console.log('dataqqq',dataUser)
      setData(dataUser)
      setLoading(false)
    } catch (err) {
      //console.log('error', err)
      setError(err)
      setLoading(false)
    }
  }
load()
}, [url])


  return {
    loading,
    data,
    error
  }
}
