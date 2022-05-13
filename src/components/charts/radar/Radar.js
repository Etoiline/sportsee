import * as d3 from 'd3'
import radarCss from './Radar.module.css'
import { useSportSeeAPIPerformance } from '../../../services/sportseeAPI'
import { useEffect, useState, useContext } from "react"
import { SrcContext } from '../../../services/SrcProvider'
import PropTypes from 'prop-types'


/**
 * Radar component
 * 
 * @param props : user id
 * 
 * @return radar component (radar chart)
 *    
 */

function Radar(props) {

  const context = useContext(SrcContext)
  const source = context.dataSource
  const { loadingPerformance, dataPerformance, errorPerformance } = useSportSeeAPIPerformance(props.id, source)

  const [valuePerformance, setValuePerformance] = useState([])


  useEffect(() => {
    if (loadingPerformance === false) {
      setValuePerformance(dataPerformance.data)
    }
  }, [loadingPerformance, dataPerformance])


  useEffect(() => {
    if (valuePerformance.length > 0) {
      createPerformanceChart()
    }
  }, [valuePerformance])


  /**
   * Main function to create chart 
   *    
   */

  function createPerformanceChart() {
    document.getElementById('radar_chart').innerHTML = ''

    //extract only values
    let values = valuePerformance.map(value => {
      return (value.value)
    })

    // Create the scales for rank our data
    let radialScale = d3.scaleLinear()
      .domain([0, d3.max(values) * 1.25])
      .range([5, 120])

    //coordinates of the center of the graph
    let xCenter = 133
    let yCenter = 140

    //create main polygon
    let coordinatesPolygon = []
    valuePerformance.forEach((oneData, index) => {
      let rayonData = radialScale(oneData.value)
      switch (index) {
        case 0: // cardio
          coordinatesPolygon.push([xCenter - rayonData * Math.sqrt(3) / 2, yCenter + rayonData / 2])
          break
        case 1: //energy
          coordinatesPolygon.push([xCenter - rayonData * Math.sqrt(3) / 2, yCenter - rayonData / 2])
          break
        case 2: //endurance
          coordinatesPolygon.push([xCenter - 0, yCenter - rayonData])
          break
        case 3: //strenght
          coordinatesPolygon.push([xCenter + rayonData * Math.sqrt(3) / 2, yCenter - rayonData / 2])
          break
        case 4: //speed
          coordinatesPolygon.push([[xCenter + rayonData * Math.sqrt(3) / 2, yCenter + rayonData / 2]])
          break
        case 5: //intensity
          coordinatesPolygon.push([xCenter + 0, yCenter + rayonData])
          break
        default:
          break
      }

    })





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
      let rayon = radialScale(i * (d3.max(values) * 1.25) / 5)
      createHexagon(chart, rayon, xCenter, yCenter)
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


/**
 * Function createHexagonPoints 
 * 
 * @param rayon : radius of the circle in which the hexagon fits
 * @param xCenter : X coordinates of the hexagon center
 * @param yCenter : Y coordinates of the hexagon center
 * 
 * @return points : array with coordinates of the 6 verticesof the hexagon
 *    
 */
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

/**
 * Function createHexagon 
 * 
 * @param chart : main chart
 * @param rayon : radius of the circle in which the hexagon fits
 * @param xCenter : X coordinates of the hexagon center
 * @param yCenter : Y coordinates of the hexagon center
 * 
 * This function create the hexagon and add it to the chart
 */
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

Radar.propTypes = {
  id: PropTypes.string
}

export default Radar