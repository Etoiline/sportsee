import MacroElement from "./MacroElement"
import caloriesIcon from '../../assets/calories-icon.png'
import carbsIcon from '../../assets/carbs-icon.png'
import fatIcon from '../../assets/fat-icon.png'
import proteinIcon from '../../assets/protein-icon.png'
import colMacros from './Macros.module.css'
import { useSportseeAPI } from "../../services/sportseeAPI"

const VALUE_BY_KEY = {
  calorieCount: 'Calories',
  proteinCount: 'Protéines',
  carbohydrateCount: 'Glucides',
  lipidCount: 'Lipides'
}

const UNIT_BY_TYPE = {
  calorieCount: "kCal",
  carbohydrateCount: "g",
  proteinCount: "g",
  lipidCount: "g",
}

const ICON_BY_TYPE = {
  calorieCount: caloriesIcon,
  carbohydrateCount: carbsIcon,
  proteinCount: proteinIcon,
  lipidCount: fatIcon,
};


function Macros(props) {

  const dataMacro = props.macroValues
  

  return (
    <div className={colMacros.macros}>
      {Object.entries(dataMacro).map(([key,value])=> (
      <MacroElement 
        key={key}
        elementName={VALUE_BY_KEY[key]} 
        elementValue={value} 
        elementUnit={UNIT_BY_TYPE[key]} 
        elementIcon = {ICON_BY_TYPE[key]}/>
))}
    </div>
      
  )
}

export default Macros
