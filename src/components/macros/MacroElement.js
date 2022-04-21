import macroElement from './MacroElement.module.css'

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

export default MacroElement
