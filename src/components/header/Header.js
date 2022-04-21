import header from './Header.module.css'

function Header(props) {
  const name = props.name
  return (
    <div className={header.header}>
      <p className={header.titre}>Bonjour <span>{name}</span></p>
      <p className={header.congrat}>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
    </div>
      
  )
}

export default Header
