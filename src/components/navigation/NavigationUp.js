import logo from '../../assets/logo.png'
import navigationUp from './NavigationUp.module.css'
import { Link } from 'react-router-dom'

function NavigationUp() {
  return (
    <div className={navigationUp.main}>
      <Link to={'./'}><img className={navigationUp.logo} src={logo} alt='sportsee'/></Link>
      <div className={navigationUp.menu}>
        <ul>
          <li>Accueil</li>
          <li>Profil</li>
          <li>Réglage</li>
          <li>Communauté</li>
        </ul>
      </div>
    </div>
      
  )
}

export default NavigationUp
