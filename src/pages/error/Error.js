import Header from '../../components/header/Header'
import { useSportSeeAPIMainError } from '../../services/sportseeAPI'
import ErrorCss from './Error.module.css'


function Error() {

  const { loadingMainError, dataMainError, errorMainError } = useSportSeeAPIMainError()

  const ShowData = () => {
    if (errorMainError) {
      console.log(errorMainError)
      return <div ><h1>OOOOOPS - 500</h1>
        <h2>Internal Server Error</h2></div>
    }
    else return (<div >
      {!loadingMainError ? <Header name={dataMainError.userInfos.firstName} /> : <></>}
    </div>)
  }

  return (
    <div className={ErrorCss.main} >
      {!loadingMainError ? <ShowData /> : <></>}
    </div>

  )
}

export default Error