import header from './Header.module.css'

function Header(props) {

  return (
    <div className={header.header}>
      <p className={header.titre}>Bonjour <span>{props.name}</span></p>
      <p className={header.congrat}>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
    </div>
      
  )
}

export default Header
