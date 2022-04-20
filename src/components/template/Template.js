import NavigationSide from '../navigation/NavigationSide.js';
import NavigationUp from '../navigation/NavigationUp.js';
import template from './Template.module.css'
import { Outlet } from 'react-router-dom'

function Template() {
  return (
    <div className={template.app}>
      <div className={template.navigationUp}>
        <NavigationUp />
      </div>
      <div className={template.page}>
        <NavigationSide />
        <Outlet />
      </div>
    
    </div>
  )
}

export default Template