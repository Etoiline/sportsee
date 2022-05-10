import axios from 'axios'
import { useEffect, useState } from "react"
import { returnURL } from './adresses'


///////////////Créer un hokk par composant////////////////
// const source = 'MOCKED'
//const source='BACKEND'




export const useSportseeAPI = (user,source, type) => {
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



/**
         * Return main user data
         * 
         * @param user : user id
         * @param source : source of data (MOCKED or BACKEND)
         * 
         * @return loadingMain : indicates loading status
         * @return dataMain : object containing id user, keyData object (macros data), user score and user info 
         * @return errorMain : indicates any errors
         *    
         */
 export const useSportSeeAPIMain = (user, source) => {
  const url = returnURL(user, source, 'url_user')
  const [loadingMain, setLoading] = useState(true)
  const [dataMain, setData] = useState([])
  const [errorMain, setError] = useState(undefined)

  useEffect(() => {
    const load = async () => {
      try {
        const response = await axios.get(url)
        let dataUser = (source === 'BACKEND') ? response.data.data : response.data
        setData(dataUser)
        setLoading(false)
      } catch (err) {
        setError(err)
        setLoading(false)
      }
    }
    load()
  }, [url])


  return {
    loadingMain,
    dataMain,
    errorMain
  }
}









/**
         * Return sessions data
         * 
         * @param user : user id
         * @param source : source of data (MOCKED or BACKEND)
         * 
         * @return loading : indicates loading status
         * @return data : array containing for each day the duration of the session
         * @return error : indicates any errors
         *    
         */
export const useSportSeeAPISession = (user, source) => {
  const url = returnURL(user, source, 'url_sessions')
  const [loadingSession, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [error, setError] = useState(undefined)

  useEffect(() => {
    const load = async () => {
      try {
        const response = await axios.get(url)
        let dataUser = (source === 'BACKEND') ? response.data.data : response.data
        setData(dataUser)
        setLoading(false)
      } catch (err) {
        setError(err)
        setLoading(false)
      }
    }
    load()
  }, [url])


  return {
    loadingSession,
    data,
    error
  }
}





/**
         * Return data user activity
         * 
         * @param user : user id
         * @param source : source of data (MOCKED or BACKEND)
         * 
         * @return loading : indicates loading status
         * @return data : object containing id user and an array with weight and calories for the week 
         * @return error : indicates any errors
         *    
         */
 export const useSportSeeAPIActivity = (user, source) => {
  const url = returnURL(user, source, 'url_activity')
  const [loadingActivity, setLoading] = useState(true)
  const [dataActivity, setData] = useState([])
  const [errorActivity, setError] = useState(undefined)

  useEffect(() => {
    const load = async () => {
      try {
        const response = await axios.get(url)
        let dataUser = (source === 'BACKEND') ? response.data.data : response.data
        setData(dataUser)
        setLoading(false)
      } catch (err) {
        setError(err)
        setLoading(false)
      }
    }
    load()
  }, [url])


  return {
    loadingActivity,
    dataActivity,
    errorActivity
  }
}
