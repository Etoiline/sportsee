import axios from 'axios'
import { useEffect, useState } from "react"
import { returnURL } from './adresses'


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
         * @return loadingSession : indicates loading status
         * @return dataSession : array containing for each day the duration of the session
         * @return errorSession : indicates any errors
         *    
         */
export const useSportSeeAPISession = (user, source) => {
  const url = returnURL(user, source, 'url_sessions')
  const [loadingSession, setLoading] = useState(true)
  const [dataSession, setData] = useState([])
  const [errorSession, setError] = useState(undefined)

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
    dataSession,
    errorSession
  }
}





/**
         * Return data user activity
         * 
         * @param user : user id
         * @param source : source of data (MOCKED or BACKEND)
         * 
         * @return loadingActivity : indicates loading status
         * @return dataActivity : object containing id user and an array with weight and calories for the week 
         * @return errorActivity : indicates any errors
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



/**
         * Return performance data
         * 
         * @param user : user id
         * @param source : source of data (MOCKED or BACKEND)
         * 
         * @return loadingPerformance : indicates loading status
         * @return dataPerformance : array containing values for each characteristic
         * @return errorPerformance : indicates any errors
         *    
         */
 export const useSportSeeAPIPerformance = (user, source) => {
  const url = returnURL(user, source, 'url_performance')
  const [loadingPerformance, setLoadingPerformance] = useState(true)
  const [dataPerformance, setDataPerformance] = useState([])
  const [errorPerformance, setErrorPerformance] = useState(undefined)

  useEffect(() => {
    const load = async () => {
      try {
        const response = await axios.get(url)
        let dataUser = (source === 'BACKEND') ? response.data.data : response.data
        setDataPerformance(dataUser)
        setLoadingPerformance(false)
      } catch (err) {
        setErrorPerformance(err)
        setLoadingPerformance(false)
      }
    }
    load()
  }, [url])


  return {
    loadingPerformance,
    dataPerformance,
    errorPerformance
  }
}


/**
         * Return error, simulates problem on the server (not responding, not starting)
         * Here we set a wrong port (3008)
         * 
         * @return loadingMainError : indicates loading status
         * @return dataMainError : object containing id user, keyData object (macros data), user score and user info 
         * @return errorMainError : indicates any errors
         *    
         */
 export const useSportSeeAPIMainError = () => {
  const url = 'http://localhost:3008/user'
  const [loadingMainError, setLoadingError] = useState(true)
  const [dataMainError, setDataError] = useState([])
  const [errorMainError, setErrorError] = useState(undefined)

  useEffect(() => {
    const load = async () => {
      try {
        const response = await axios.get(url)
        let dataUser =  response.data.data 
        setDataError(dataUser)
        setLoadingError(false)
      } catch (err) {
        setErrorError(err)
        setLoadingError(false)
      }
    }
    load()
  }, [url])


  return {
    loadingMainError,
    dataMainError,
    errorMainError
  }
}
