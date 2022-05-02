import Header from '../../components/header/Header'
import Macros from '../../components/macros/Macros'
import Weight from '../../components/charts/weight/Weight'
import Session from '../../components/charts/session/Session'
import { useParams } from 'react-router-dom'
import main from './Main.module.css'

function Main(props) {
  const { idUser } = useParams()
  const source = props.source
  //console.log("main")
  return (
    <div className={main.main}>
      <Header id={idUser} source={source} />
      <div className={main.data}>
        <div className={main.charts}>
          <Weight id={idUser} source={source} />
          <div className={main.analyze}>
            <Session id={idUser} source={source} />
            <div className={main.radar}><p>radar</p></div>
            <div className={main.kpi}><p>kpi</p></div>
          </div>

        </div>
      <Macros id={idUser} source={source} />
      </div>
    </div>
      
  )
}

export default Main