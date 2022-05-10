import header from './Header.module.css'
import { useSportSeeAPIMain } from '../../services/sportseeAPI'
import { useEffect, useState, useContext } from "react"
import propTypes from 'prop-types'
import { SrcContext } from '../../services/SrcProvider'


function Header(props) {
  // //console.log('header')
  // const context = useContext(SrcContext)
  // const source = context.dataSource
  // const {loading, data, error} = useSportSeeAPIMain(props.id, source)
  // //console.log('header data', loading,error,data.data)

  // const [name, setName] = useState('')
  // useEffect(()=> {
  //   if(loading===false){
  //     //console.log('daaaata',data)
  //     setName(data.userInfos.firstName)
  //   }
      
  //  },[loading, data] ) 


  
    return (
      <div className={header.header}>
        <p className={header.titre}>Bonjour <span>{props.name}</span></p>
        <p className={header.congrat}>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
      </div>
    )
  }

  Header.propTypes = {
    id : propTypes.number,
  }

export default Header
