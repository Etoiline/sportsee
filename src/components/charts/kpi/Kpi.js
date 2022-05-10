import * as d3 from 'd3'
import { useSportseeAPI } from '../../../services/sportseeAPI';
import  kpiCss from './Kpi.module.css'
import { useEffect, useState } from "react"

function Kpi(props) {


return (
  <div className={kpiCss.main}>
    <div id="kpi_chart">
      
    </div>

  </div>
)
}


export default Kpi