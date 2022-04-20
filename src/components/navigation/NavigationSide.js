import relaxationIcon from '../../assets/relaxation-icon.png'
import swimmingIcon from '../../assets/swimming-icon.png'
import bikingIcon from '../../assets/biking-icon.png'
import bodyBuildingIcon from '../../assets/bodybuilding-icon.png'
import navigationSide from './NavigationSide.module.css'

function NavigationSide() {
  return (
    <div className={navigationSide.main}>
        <div className={navigationSide.icons}>
          <img src={relaxationIcon} alt='relaxation_menu' />
          <img src={swimmingIcon} alt='swimming_menu' />
          <img src={bikingIcon} alt='biking_menu' />
          <img src={bodyBuildingIcon} alt='biking_menu' />
        </div>
        <p className={navigationSide.copyright}>Copiryght, SportSee 2020</p>
    </div>
      
  )
}

export default NavigationSide
