import macroElement from './MacroElement.module.css'
import PropTypes from 'prop-types'

/**
 * Macro Element component
 * 
 * @param props.elementIcon : url of icon
 * @param props.elementName : name of macro element
 * @param props.elementValue : value of macro element
 * @param props.elementUnit : unit of macro element
 * 
 * @return macro element component
 *    
 */

function MacroElement(props) {
  //console.log('Ici MacroElement',props.elementName )

  return (
    <div className={macroElement.main}>
      <div className={macroElement.icone}>
        <img src={props.elementIcon} alt={props.elementName} />
      </div>
      <div className={macroElement.description}>
        <p className={macroElement.value}>{props.elementValue} {props.elementUnit}</p>
        <p className={macroElement.name}>{props.elementName}</p>
      </div>
    </div>
      
  )
}

MacroElement.propTypes = {
  elementName : PropTypes.string,
  elementValue : PropTypes.number,
  elementUnit : PropTypes.string,
  elementIcon : PropTypes.string
}

export default MacroElement
