import {useSportseeAPI} from '../../services/sportseeAPI'
import Header from '../../components/header/Header'
import Macros from '../../components/macros/Macros'
import Weight from '../../components/charts/weight/Weight'
import { useParams } from 'react-router-dom'
import main from './Main.module.css'

function Main(props) {
  const { idUser } = useParams()
  console.log("main")
  //console.log('iduser', idUser, props.source)
  const {loading, data, error} = useSportseeAPI(idUser,props.source ,'url_user')
  // if (loading===false) {
  // console.log('return', data)}
  return (
    <div className={main.main}>
      {!loading?<Header name={data.data.userInfos.firstName}/>:<></>}
      <div className={main.data}>
        <div className={main.charts}>
          <Weight />
          <div className={main.analyze}>
            <div className={main.sessions}></div>
            <div className={main.radar}></div>
            <div className={main.kpi}></div>
          </div>

        </div>
      {!loading?<Macros macroValues={data.data.keyData}/>:<></>}
      </div>
    </div>
      
  )
}

export default Main