import * as d3 from 'd3'
import  radarCss from './Radar.module.css'
import { useEffect, useState } from "react"

function Radar(props) {

  //document.getElementById('radar_chart').innerHTML=''
 let data = [80,120,140,50,200,90]
 

//exemple de tableau de points pour un polygone
 let points = [
  [50, 50],
  [50, 150],
  [150, 150],
  [150, 50],
  [100, 100],
  [125, 125]
];



 // Create the scales for rank our data
 let radialScale = d3.scaleLinear()
                      .domain([0,d3.max(data)*1.25])
                      .range([0,105])
 // Create the chart
 let chart = d3.select("#radar_chart")
      .append("svg")
     .attr('class', 'svg_radar_chart')
     .attr ('height','280px')
     .attr ('width', '266px' )
     chart.append("polygon")
     .attr('points', "50,50 200,50 250,100 250,150 20,50")
     .attr('stroke', '#f00')
     .attr('fill', '#FFF');


       const rayon = 40
       chart.append("circle")
       .attr("cx", 200+0)
       .attr("cy", 100+rayon )
       .attr("r",2)
       chart.append("circle")
       .attr("cx", 200+rayon*Math.sqrt(3)/2)
       .attr("cy", 100+rayon/2 )
       .attr("r",2)
       chart.append("circle")
       .attr("cx", 200+rayon*Math.sqrt(3)/2)
       .attr("cy", 100-rayon/2 )
       .attr("r",2)
       chart.append("circle")
       .attr("cx", 200-0)
       .attr("cy", 100-rayon )
       .attr("r",2)
       chart.append("circle")
       .attr("cx", 200-rayon*Math.sqrt(3)/2)
       .attr("cy", 100-rayon/2 )
       .attr("r",2)
       chart.append("circle")
       .attr("cx", 200-rayon*Math.sqrt(3)/2)
       .attr("cy", 100+rayon/2 )
       .attr("r",2)





return (
  <div className={radarCss.main}>
    <div id="radar_chart">
      
    </div>

  </div>
)
}


export default Radar