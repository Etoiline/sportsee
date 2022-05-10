import header from './Header.module.css'
import { useSportseeAPI } from '../../services/sportseeAPI'
import { useEffect, useState } from "react"
import propTypes from 'prop-types'


function Header(props) {
  //console.log('header')
  const {loading, data, error} = useSportseeAPI(props.id ,'url_user')
  //console.log('header data', loading,error,data.data)

  const [name, setName] = useState('')
  useEffect(()=> {
    if(loading===false){
      //console.log('daaaata',data)
      setName(data.userInfos.firstName)
    }
      
   },[loading, data] ) 

  
    return (
      <div className={header.header}>
        <p className={header.titre}>Bonjour <span>{name}</span></p>
        <p className={header.congrat}>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
      </div>
    )
  }

  Header.propTypes = {
    id : propTypes.number,
  }

export default Header
