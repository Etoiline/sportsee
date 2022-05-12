import * as d3 from 'd3'
import KpiCss from './Kpi.module.css'

//test comm ou pas

function Kpi(props) {

  const score = props.score
 
  console.log(score)
//affichage
 document.getElementById('kpi_chart').innerHTML = ''
 const angleScale = d3.scaleLinear()
     .domain ([0,1])
     .range([0,2*Math.PI])
  
  // Create the chart
  let chart = d3.select("#kpi_chart")
    .append("svg")
    .attr('class', 'svg_kpi_chart')
    .attr('height', '280px')
    .attr('width', '266px')

    //title
    chart.append('text')
      .attr('x', 50)
      .attr('y', 40)
      .attr('width', '200px')
      .attr('fill', 'black')
      .attr('text-anchor', 'middle')
      .style('font-family', 'Roboto')
      .style('font-size', 15)
      .text('Score')

      let grp = chart.append("g")
            .attr("transform", "translate(130,140)");
  
        // An arc will be created 
        let arc = d3.arc()
            .innerRadius(70)
            .outerRadius(78)
            .startAngle(0)
            .endAngle(angleScale(score));
  
        grp.append("path")
            .attr("class", "arc")
            .attr("d", arc)
            .attr("fill","green")
            .attr("stroke", "green")
            .attr("stroke-linecap", "round") 

  
        grp.append("circle")
            .attr("class", "arc2")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("r", 70)
            .attr("fill", "white")

    
      //adding legend
      chart.append('text')
      .attr('x', 135)
      .attr('y', 120)
      .attr('fill', 'black')
      .attr('text-anchor', 'middle')
      .style('font-family', 'Roboto')
      .style('font-weight', '700')
      .style('font-size', 26)
      .text(score*100+" %")

      chart.append('text')
      .attr('x', 135)
      .attr('y', 145)
      .attr('fill', 'black')
      .attr('text-anchor', 'middle')
      .style('font-family', 'Roboto')
      .style('font-size', 16)
      .text('de votre')

      chart.append('text')
      .attr('x', 135)
      .attr('y', 170)
      .attr('fill', 'black')
      .attr('text-anchor', 'middle')
      .style('font-family', 'Roboto')
      .style('font-size', 16)
      .text('objectif')

  return (
    <div className={KpiCss.main}>
      <div id="kpi_chart">

      </div>

    </div>
  )
}


export default Kpi