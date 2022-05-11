import * as d3 from 'd3'
import radarCss from './Radar.module.css'
import { useSportSeeAPIPerformance } from '../../../services/sportseeAPI'
import { useEffect, useState, useContext } from "react"
import { SrcContext } from '../../../services/SrcProvider';

function Radar(props) {


  const context = useContext(SrcContext)
  const source = context.dataSource
  const { loadingPerformance, dataPerformance, errorPerformance } = useSportSeeAPIPerformance(props.id, source)

  const [valuePerformance, setValuePerformance] = useState([])


  useEffect(() => {
    if (loadingPerformance === false) {
      setValuePerformance(dataPerformance.data)
      console.log(dataPerformance.data)
    }
  }, [loadingPerformance, dataPerformance])


  useEffect(() => {
    if (valuePerformance.length > 0) {
      createPerformanceChart()
    }
  }, [valuePerformance])


function createPerformanceChart(){
  document.getElementById('radar_chart').innerHTML = ''
  let data = [80, 120, 140, 50, 200, 90]
  let dataFichier = [
    {
      "value":80,
      "kind":1
    },
    {
      "value":120,
      "kind":2
    },
    {
      "value":140,
      "kind":3
    },
    {
      "value":50,
      "kind":4
    },
    {
      "value":200,
      "kind":5
    },
    {
      "value":90,
      "kind":6
    }
  ]

  let kind = {
    "1":"cardio",
    "2":"energy",
    "3":"endurance",
    "4":"strength",
    "5":"speed",
    "6":"intensity"
  }

    // Create the scales for rank our data
    let radialScale = d3.scaleLinear()
    .domain([0, d3.max(data) * 1.25])
    .range([5, 120])
  
    //coordinates of the center of the graph
    let xCenter = 133
    let yCenter = 140

let coordinatesPolygon = []
  dataFichier.forEach( (oneData, index) => {
    console.log(index, oneData, oneData.value)
    let rayonData = radialScale(oneData.value)
    switch (index) {
      case 0 : // cardio
        coordinatesPolygon.push([xCenter - rayonData * Math.sqrt(3) / 2, yCenter + rayonData / 2])
        break
      case 1 : //energy
        coordinatesPolygon.push([xCenter - rayonData * Math.sqrt(3) / 2, yCenter - rayonData / 2])
        break
      case 2 : //endurance
        coordinatesPolygon.push([xCenter - 0, yCenter - rayonData])
        break
      case 3 : //strenght
        coordinatesPolygon.push([xCenter + rayonData * Math.sqrt(3) / 2, yCenter - rayonData / 2])
        break
      case 4 : //speed
       coordinatesPolygon.push([[xCenter + rayonData * Math.sqrt(3) / 2, yCenter + rayonData / 2]])
        break
      case 5 : //intensity
        coordinatesPolygon.push([xCenter + 0, yCenter + rayonData])
        break
      default :
        break
    }

  })

  console.log(coordinatesPolygon)




  // Create the chart
  let chart = d3.select("#radar_chart")
    .append("svg")
    .attr('class', 'svg_radar_chart')
    .attr('height', '280px')
    .attr('width', '266px')

    
chart.append("polygon")
      .attr('points', coordinatesPolygon)
      .style("stroke", "#FF0101B2")
      .style("fill", "#FF0101B2")

  //create five hexagon
  for (let i = 0; i < 5; i++) {
    let rayon = radialScale(i * (d3.max(data) * 1.25) / 5)
    createHexagon(chart, rayon, xCenter, yCenter)
    console.log("i", i, rayon)
  }

  //adding legend
  chart.append('text')
    .attr('x', xCenter)
    .attr('y', yCenter - 110)
    .attr('fill', 'white')
    .attr('text-anchor', 'middle')
    .style('font-family', 'Roboto')
    .style('font-size', 12)
    .text('Intensité')

  chart.append('text')
    .attr('x', xCenter + 125 * Math.sqrt(3) / 2)
    .attr('y', yCenter - 45)
    .attr('fill', 'white')
    .attr('text-anchor', 'middle')
    .style('font-family', 'Roboto')
    .style('font-size', 12)
    .text('Vitesse')

  chart.append('text')
    .attr('x', xCenter + 125 * Math.sqrt(3) / 2)
    .attr('y', yCenter + 52)
    .attr('fill', 'white')
    .attr('text-anchor', 'middle')
    .style('font-family', 'Roboto')
    .style('font-size', 12)
    .text('Force')

  chart.append('text')
    .attr('x', xCenter)
    .attr('y', yCenter + 115)
    .attr('fill', 'white')
    .attr('text-anchor', 'middle')
    .style('font-family', 'Roboto')
    .style('font-size', 12)
    .text('Endurance')

  chart.append('text')
    .attr('x', xCenter - 125 * Math.sqrt(3) / 2)
    .attr('y', yCenter + 52)
    .attr('fill', 'white')
    .attr('text-anchor', 'middle')
    .style('font-family', 'Roboto')
    .style('font-size', 12)
    .text('Energie')

  chart.append('text')
    .attr('x', xCenter - 125 * Math.sqrt(3) / 2)
    .attr('y', yCenter - 45)
    .attr('fill', 'white')
    .attr('text-anchor', 'middle')
    .style('font-family', 'Roboto')
    .style('font-size', 12)
    .text('Cardio')
  }


  function createHexagonPoints(rayon, xCenter, yCenter) {
    let points = [[xCenter + 0, yCenter + rayon],
    [xCenter + rayon * Math.sqrt(3) / 2, yCenter + rayon / 2],
    [xCenter + rayon * Math.sqrt(3) / 2, yCenter - rayon / 2],
    [xCenter - 0, yCenter - rayon],
    [xCenter - rayon * Math.sqrt(3) / 2, yCenter - rayon / 2],
    [xCenter - rayon * Math.sqrt(3) / 2, yCenter + rayon / 2]
    ]
    return points

  }

  function createHexagon(chart, rayon, xCenter, yCenter) {
    let hexa = createHexagonPoints(rayon, xCenter, yCenter)
    chart.append("polygon")
      .attr('points', hexa)
      .style("stroke", "#FFF")
      .style("fill", "none")
  }





  return (
    <div className={radarCss.main}>
      <div id="radar_chart">

      </div>

    </div>
  )
}


export default Radar