import Header from '../../components/header/Header'
import Macros from '../../components/macros/Macros'
import Weight from '../../components/charts/weight/Weight'
import Session from '../../components/charts/session/Session'
import Radar from '../../components/charts/radar/Radar'
import Kpi from '../../components/charts/kpi/Kpi'
import { useSportSeeAPIMain } from '../../services/sportseeAPI'
import { useParams } from 'react-router-dom'
import main from './Main.module.css'
import { useContext } from 'react'
import { SrcContext } from '../../services/SrcProvider'


function Main() {
  const { idUser } = useParams()
  const context = useContext(SrcContext)
  const source = context.dataSource
  const {loadingMain, dataMain, errorMain} = useSportSeeAPIMain(idUser,source)

  const ShowData = () => {
    if(errorMain){
      console.log(errorMain)
    return <div>ERREUR</div>
  }
  else return (<div className={main.main}>
    {!loadingMain?<Header name={dataMain.userInfos.firstName} />:<></>}
    <div className={main.data}>
      <div className={main.charts}>
        <Weight id={idUser} />
        <div className={main.analyze}>
          <Session id={idUser}/>
          <Radar id={idUser} />
          {!loadingMain?<Kpi score={dataMain.score} />:<></>}
        </div>

      </div>
    {!loadingMain?<Macros dataMacro={dataMain.keyData}/>:<></>}
    </div>
  </div>)
  }

  return (
    <div>
        {!loadingMain ? <ShowData /> : <></>}
    </div>
      
  )
}

export default Main