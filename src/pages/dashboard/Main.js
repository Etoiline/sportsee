import Header from '../../components/header/Header'
import Macros from '../../components/macros/Macros'
import Weight from '../../components/charts/weight/Weight'
import Session from '../../components/charts/session/Session'
import Radar from '../../components/charts/radar/Radar'
import Kpi from '../../components/charts/kpi/Kpi'
import { useSportseeAPI } from '../../services/sportseeAPI'
import { useParams } from 'react-router-dom'
import main from './Main.module.css'
// import SrcProvider from '../../services/SrcProvider'


function Main(props) {
  const { idUser } = useParams()
  const {loading, data, error} = useSportseeAPI(12 ,'url_user')

  const ShowData = () => {
    if(error){
      console.log(error)
    return <div>ERREUR</div>
  }
  else return (<div className={main.main}>
    {/* <SrcProvider> */}
    <Header id={idUser} />
    <div className={main.data}>
      <div className={main.charts}>
        <Weight id={idUser} />
        <div className={main.analyze}>
          <Session id={idUser}/>
          <Radar id={idUser} />
          <Kpi id={idUser} />
        </div>

      </div>
    <Macros id={idUser}/>
    </div>
    {/* </SrcProvider> */}
  </div>)
  }

  return (
    <div>
        {!loading ? <ShowData /> : <></>}
    </div>
      
  )
}

export default Main