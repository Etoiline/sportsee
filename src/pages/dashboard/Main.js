import {useSportseeAPI} from '../../services/sportseeAPI'
import Header from '../../components/header/Header'
import Macros from '../../components/macros/Macros'
import Weight from '../../components/charts/weight/Weight'
import { useParams } from 'react-router-dom'

function Main() {
  const { idUser } = useParams()
  console.log('iduser', idUser)
  const {loading, data, error} = useSportseeAPI(idUser, 'url_user')
  console.log('returnData', data)
  if (loading===false) {
  console.log('return', data)}
  return (
    <div className='content'>
      {!loading?<Header name={data.data.userInfos.firstName}/>:<></>}
      <div className='content'>
        <div className='charts'>
          <Weight />
          <div className='analyze'>
            <div className='durationSession'></div>
            <div className='radar'></div>
            <div className='kpi'></div>
          </div>

        </div>
      {!loading?<Macros macroValues={data.data.keyData}/>:<></>}
      </div>
    </div>
      
  )
}

export default Main
