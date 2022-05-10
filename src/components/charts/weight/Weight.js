import * as d3 from 'd3'
import { useSportSeeAPIActivity } from '../../../services/sportseeAPI';
import  './Weight.css'
import { useEffect, useState, useContext } from "react"
import { SrcContext } from '../../../services/SrcProvider';

function Weight(props) {
  //console.log("weight")
  const context = useContext(SrcContext)
  const source = context.dataSource
  const {loading, data, error} = useSportSeeAPIActivity(props.id, source)

  const [datasetCalories, setDatasetCalories] = useState([])

  const [datasetWeight, setDatasetWeight]= useState([])

  useEffect(()=> {
    if(loading===false){
      setDatasetWeight(data.sessions.map (dataWeight => {
        return (dataWeight.kilogram)
      }))
      setDatasetCalories(data.sessions.map (dataCalories => {
        return (dataCalories.calories)
      }))
    }
    
  },[loading, data] ) 

  useEffect(()=> {
    if (datasetCalories.length>0 && datasetWeight.length>0){
      createChart()
    }
  },[datasetCalories, datasetWeight] ) 




  function createWeightBars(chart, minoration, majoration){
    //tooltip
    d3.select("body").append("div")
    .attr("class", "chart-tooltip")         
    .style("opacity", 0);

    //fonction de remplissage des ordonnées
    // La largeur de la barre est déterminée par l'attribut width
    // La hauteur par l'attribut height calculé avec la fonction de mise à l'échelle
    const yScale = d3.scaleLinear()
     .domain ([d3.min(datasetWeight)*minoration,d3.max(datasetWeight)*majoration])
     .range([0,200])

    var weightBars = chart.append('g')
    .attr('id', 'weightBars');
    weightBars.selectAll(".bar")
    .data(datasetWeight)
    .enter().append("line")
    .attr("class", "bar")
    .attr("id", (d,i)=>"jour"+i)
    .attr('x1', (d,i) => i*112+20)
    .attr("y2", (d) => 250-yScale(d))
    .attr("y1", (d,i) => 250)
    .attr("x2", (d,i) => i*112+20)
    .style("stroke", "#282D30")          // colour the line
    .style("stroke-width", 8)         // adjust line width
    .style("stroke-linecap", "round")  // stroke-linecap type
    .append('div')
  }


  function createCaloriesBars(chart, minoration, majoration){
    
    //fonction de remplissage des ordonnées
    // La largeur de la barre est déterminée par l'attribut width
    // La hauteur par l'attribut height calculé avec la fonction de mise à l'échelle
    const yScale = d3.scaleLinear()
    .domain ([d3.min(datasetCalories)*(minoration-0.08),d3.max(datasetCalories)*(majoration+0.08)])
     .range([0,200])

    var caloriesBars = chart.append('g')
    .attr('id', 'caloriesBars');
    caloriesBars.selectAll(".bar")
    .data(datasetCalories)
    .enter().append("rect")
    .attr("class", "bar")
    .attr('x', (d,i) => i*112+34)
    .attr("width", 8)
    .attr("y", (d,i) => 250-yScale(d))
    .attr("height", (d) => yScale(d))		


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



  function displayTooltip (chart) {
    // Display tooltip on mouseover
   datasetCalories.map((calory, index) => { 
    let group = chart.append("g")
        .attr("id", "day" + index)
        .attr("class", "d3")
    // create gray reactangle on mouseover
    group.append("svg:rect")
        .attr("x", index*110)
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
        .attr("x", 100+index*110)
        .attr("y", 6)
        .attr("width", 70)
        .attr("height", 95)
        .attr("fill", "#E60000")
        .attr("class", "rectRed")
        .attr("opacity", "0")
    group.append("svg:text")
        .attr("x", 110+index*110)
        .attr("y", 35)
        .attr("fill", "white")
        .text(datasetWeight[index] + "Kg")  
        .attr("opacity", "0")
    group.append("svg:text")
        .attr("x", 105+index*110)
        .attr("y", 85)
        .attr("fill", "white")
        .text(calory + "Kcal")      
        .attr("opacity", "0")
})


  }



    function createChart(){
      //console.log(datasetCalories)

      //Problème du graphique qui s'affichait 2 fois
      document.getElementById('histogram__chart').innerHTML=''

      const minoration = 0.98
      const majoration = 1.02

      //Creation du container chart
      let chart = d3.select("#histogram__chart")
      .append("svg")
     .attr('class', 'svg_chart')


    //textes des ordonnées
    chart.append("svg:text")
            .attr("x", 780)
            .attr("y", 150)
            .attr("class", "coordY")
            .attr("fill", "#9B9EAC")
            .text(Math.round((d3.min(datasetWeight)*minoration + d3.max(datasetWeight)*majoration) / 2))
    chart.append("svg:text")
            .attr("x", 780)
            .attr("y", 50)
            .attr("class", "coordY")
            .attr("fill", "#9B9EAC")
            .text(Math.round(d3.max(datasetWeight)*majoration))
    chart.append("svg:text")
            .attr("x", 780)
            .attr("y", 250)
            .attr("class", "coordY")
            .attr("fill", "#9B9EAC")
            .text(Math.round(d3.min(datasetWeight)*minoration))
    
    //lignes horizontales
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


    //fonction de remplissage des abscisses
    const xScale = d3.scaleLinear()
    .domain([1,7])
    .range([0, 670])
    for (let i =1;i<8;i++){
      chart.append("svg:text")
      .attr("x", xScale(i)+30)
      .attr("y", 280)
      .attr("class", "coordX")
      .attr("fill", "#9B9EAC")
      .text(i)
  }



      // Ajout des bars en utilisant les données
     createWeightBars(chart, minoration, majoration)
     createCaloriesBars(chart, minoration, majoration)
     
     //remplissage des tooltips
     //setTooltip()
     displayTooltip(chart)
     


   



		


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
//}

export default Weight;
