import header from './Header.module.css'
import { useSportseeAPI } from '../../services/sportseeAPI'
import { useEffect, useState } from "react"

function Header(props) {
  //console.log('header')
  const {loading, data, error} = useSportseeAPI(props.id,props.source ,'url_user')
  //console.log('header data', loading,error,data.data)

  const [name, setName] = useState('')
  useEffect(()=> {
    if(loading===false){
      //console.log('daaaata',data)
      setName(data.userInfos.firstName)
    }
      
   },[loading, data] ) 
  
// console.log('adadadad',namee)

//   if(loading===false){ 
//     var name = data.userInfos.firstName
  
    return (
      <div className={header.header}>
        <p className={header.titre}>Bonjour <span>{name}</span></p>
        <p className={header.congrat}>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
      </div>
    )
  }
//}

export default Header
