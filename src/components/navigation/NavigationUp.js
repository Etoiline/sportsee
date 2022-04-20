import logo from '../../assets/logo.png'
import navigationUp from './NavigationUp.module.css'

function NavigationUp() {
  return (
    <div className={navigationUp.main}>
      <img className={navigationUp.logo} src={logo} alt='sportsee'/>
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
