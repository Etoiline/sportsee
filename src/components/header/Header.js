import header from './Header.module.css'
import propTypes from 'prop-types'


function Header(props) {
  
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
