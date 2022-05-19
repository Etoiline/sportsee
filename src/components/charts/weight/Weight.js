import * as d3 from 'd3'
import { useSportSeeAPIActivity } from '../../../services/sportseeAPI'
import './Weight.css'
import { useEffect, useState, useContext } from "react"
import { SrcContext } from '../../../services/SrcProvider'
import PropTypes from 'prop-types'

/**
 * Weight chart component
 * 
 * @param props : user id
 * 
 * @return weight chart component
 *    
 */

function Weight(props) {
  //console.log("weight")
  const context = useContext(SrcContext)
  const source = context.dataSource
  const { loadingActivity, dataActivity, errorActivity } = useSportSeeAPIActivity(props.id, source)

  const [datasetCalories, setDatasetCalories] = useState([]) //set containing calories values
  const [datasetWeight, setDatasetWeight] = useState([]) //set containing weight values

  useEffect(() => {
    if (loadingActivity === false) {
      setDatasetWeight(dataActivity.sessions.map(dataWeight => {
        return (dataWeight.kilogram)
      }))
      setDatasetCalories(dataActivity.sessions.map(dataCalories => {
        return (dataCalories.calories)
      }))
    }

  }, [loadingActivity, dataActivity])

  useEffect(() => {
    if (datasetCalories.length > 0 && datasetWeight.length > 0) {
      createChart()
    }
  }, [datasetCalories, datasetWeight])



  /**
           * Function creating weight bars 
           * 
           * @param chart : main chart
           * @param minoration : index inf to calculate scale
           * @param majoration : index sup to calculate scale
           * 
           *    
           */
  function createWeightBars(chart, minoration, majoration) {
    //tooltip
    // d3.select("body").append("div")
    // .attr("class", "chart-tooltip")         
    // .style("opacity", 0);

    const yScale = d3.scaleLinear()
      .domain([d3.min(datasetWeight) * minoration, d3.max(datasetWeight) * majoration])
      .range([0, 200])

    var weightBars = chart.append('g')
      .attr('id', 'weightBars');
    weightBars.selectAll(".bar")
      .data(datasetWeight)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("id", (d, i) => "jour" + i)
      .attr('x', (d, i) => i * 112 + 20)
      .attr("y", (d, i) => 250 - yScale(d))
      .attr("height", (d) => yScale(d))
      .attr("width", 8)
      .style("stroke", "#282D30")          // colour the line
      .attr("rx",3)
      .attr("ry",3)
  }

  /**
   * Function creating calories bars 
   * 
   * @param chart : main chart
   * @param minoration : index inf to calculate scale
   * @param majoration : index sup to calculate scale
   * 
   *    
   */
  function createCaloriesBars(chart, minoration, majoration) {

    const yScale = d3.scaleLinear()
      .domain([d3.min(datasetCalories) * (minoration - 0.08), d3.max(datasetCalories) * (majoration + 0.08)])
      .range([0, 200])

    var caloriesBars = chart.append('g')
      .attr('id', 'caloriesBars');
    caloriesBars.selectAll(".bar")
      .data(datasetCalories)
      .enter().append("rect")
      .attr("class", "bar")
      .attr('x', (d, i) => i * 112 + 34)
      .attr("width", 8)
      .attr("y", (d, i) => 250 - yScale(d))
      .attr("height", (d) => yScale(d))
      .attr("rx",3)
      .attr("ry",3)


  }


  // function setTooltip () {
  //   for (let i=0;i<datasetCalories.length;i++){
  //     const tooltip = d3.select('#jour'+i+'>div')
  //     const datasetWeightTxt = tooltip.append('svg:text')
  //     datasetWeightTxt.attr("x", 120+i*110)
  //           .attr("y", 40)
  //           .style("text-anchor", "middle")
  //           .attr("class", "d3 text-xs text-white fill-current")
  //     datasetWeightTxt.text(datasetWeight[i] + "kg")
  //     const datasetCaloriestxt = tooltip.append('svg:text')
  //     datasetCaloriestxt.text(datasetCalories[i] + "kCal")
  //   }
  // }


  /**
           * Function displaying tooltip on mousehover 
           * 
           * @param chart : main chart
           *    
           */
  function manageTooltip(chart) {
    datasetCalories.map((calory, index) => {
      let group = chart.append("g")
        .attr("id", "day" + index)
        .attr("class", "d3")
      // create gray reactangle on mouseover
      group.append("svg:rect")
        .attr("x", index * 110)
        .attr("y", 55)
        .attr("width", 80)
        .attr("height", 195)
        .attr("class", "d3 text-gray-500 fill-current")
        .attr("opacity", "0")
        // events
        .on("mouseover", function () {
          d3.selectAll(`#day${index} > text`).transition()
            .attr("opacity", "1")
            .attr("class", "d3 text-white-500 fill-current")
          d3.selectAll(`#day${index} > .rectRed`).transition()
            .attr("opacity", "1")
          d3.select(this).transition()
            .duration("150")
            .attr("opacity", ".2")
        })
        .on("mouseout", function () {
          d3.select(this).transition()
            .duration("150")
            .attr("opacity", "0")
          d3.selectAll(`#day${index} > *`).transition()
            .attr("opacity", "0")
        })
      // infos bubble : red rect + calories + weight
      group.append("svg:rect")
        .attr("x", 100 + index * 110)
        .attr("y", 6)
        .attr("width", 70)
        .attr("height", 95)
        .attr("fill", "#E60000")
        .attr("class", "rectRed")
        .attr("opacity", "0")
      group.append("svg:text")
        .attr("x", 110 + index * 110)
        .attr("y", 35)
        .attr("fill", "white")
        .text(datasetWeight[index] + "Kg")
        .attr("opacity", "0")
      group.append("svg:text")
        .attr("x", 105 + index * 110)
        .attr("y", 85)
        .attr("fill", "white")
        .text(calory + "Kcal")
        .attr("opacity", "0")
    })


  }


  /**
   * Main function to create chart 
   *    
   */
  function createChart() {

    //solve the problem of double display
    document.getElementById('histogram__chart').innerHTML = ''

    //indices to calculate scales
    const minoration = 0.98
    const majoration = 1.02

    //Main container
    let chart = d3.select("#histogram__chart")
      .append("svg")
      .attr('class', 'svg_chart')


    //ordinate texts with weight scale values
    chart.append("svg:text")
      .attr("x", 780)
      .attr("y", 150)
      .attr("class", "coordY")
      .attr("fill", "#9B9EAC")
      .text(Math.round((d3.min(datasetWeight) * minoration + d3.max(datasetWeight) * majoration) / 2))
    chart.append("svg:text")
      .attr("x", 780)
      .attr("y", 50)
      .attr("class", "coordY")
      .attr("fill", "#9B9EAC")
      .text(Math.round(d3.max(datasetWeight) * majoration))
    chart.append("svg:text")
      .attr("x", 780)
      .attr("y", 250)
      .attr("class", "coordY")
      .attr("fill", "#9B9EAC")
      .text(Math.round(d3.min(datasetWeight) * minoration))

    //3 horizontal lines
    chart.append("line")
      .attr("x1", 20)
      .attr("y1", 50)
      .attr("x2", 720)
      .attr("y2", 50)
      .attr("stroke", "#DEDEDE")
      .attr("stroke-dasharray", "4")
    chart.append("line")
      .attr("x1", 20)
      .attr("y1", 150)
      .attr("x2", 720)
      .attr("y2", 150)
      .attr("stroke", "#DEDEDE")
      .attr("stroke-dasharray", "4")
    chart.append("line")
      .attr("x1", 20)
      .attr("y1", 250)
      .attr("x2", 720)
      .attr("y2", 250)
      .attr("stroke", "#DEDEDE")


    //abscissa coordinates
    const xScale = d3.scaleLinear()
      .domain([1, 7])
      .range([0, 670])
    for (let i = 1; i < 8; i++) {
      chart.append("svg:text")
        .attr("x", xScale(i) + 30)
        .attr("y", 280)
        .attr("class", "coordX")
        .attr("fill", "#9B9EAC")
        .text(i)
    }



    // Adding bars to the chart
    createWeightBars(chart, minoration, majoration)
    createCaloriesBars(chart, minoration, majoration)

    //Adding tooltips
    manageTooltip(chart)



  }

  return (
    <div id='histogram'>
      <div className='histogramLegend'>
        <p>Activité quotidienne</p>
        <span>
          <p className='histogramLegend__weight'><i className="fa-solid fa-circle"></i>Poids (kg)</p>
          <p className='histogramLegend__calories'><i className="fa-solid fa-circle"></i>Calories brûlées (kCal)</p>
        </span>
      </div>
      <div id="histogram__chart">

      </div>

    </div>
  )
}

Weight.propTypes = {
  id : PropTypes.string
}

export default Weight;
