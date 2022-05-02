import * as d3 from 'd3'
import { useSportseeAPI } from '../../../services/sportseeAPI';
import  sessionCss from './Session.module.css'
import { useEffect, useState } from "react"

function Session(props) {
  //console.log("weight")
  const {loading, data, error} = useSportseeAPI(props.id,props.source ,'url_sessions')

  const [dataSession, setDataSession] = useState([])


  useEffect(()=> {
    if(loading===false){
      setDataSession(data.sessions)
      createSessionChart()
    }
    
  },[loading, data] ) 

  console.log('session', dataSession)

  function createSessionChart() {
    document.getElementById('session__chart').innerHTML=''


    //extraction des sessions
    const allSessions = dataSession.map(elt => elt.sessionLength)

    //on ajoute deux éléments : un au début et un à la fin 
    //ils seront en dehors du graphique mais permettront une ligne continue (avant j1 et après j7)
    
    console.log('allSession', allSessions)

    let chart = d3.select("#session__chart")
      .append("svg")
     .attr('class', 'svg_session_chart')
     .attr ('height','180px')
     .attr ('width', '268px' )

    //fonction de remplissage des abscisses
    const xScale = d3.scaleLinear()
    .domain([1,7])
    .range([0, 220])
    const abscisse = ['L', 'M', 'M', 'J', 'V', 'S', 'D']
    for (let i =1;i<8;i++){
      chart.append("svg:text")
      .attr("x", xScale(i)+20)
      .attr("y", 150)
      .text(abscisse[i-1])
      .attr('fill', 'white')
      .attr('opacity', "50.4%")
  }

    // Add Y axis
    var yScale = d3.scaleLinear()
    .domain([0, Math.max(...dataSession.map(elt => elt.sessionLength))])
    .range([ 0, 100 ])

    // Add the dot
    chart.append('g')
        .selectAll("dot")
        .data(allSessions)
        .enter()
        .append("circle")
        .attr("cx",  (d,i) => xScale(i+1)+28 )
        .attr("cy", (d) =>  120-yScale(d) )
        .attr("r", 2)
        .style("fill", "#000")

    //add the line
        var line = d3.line()
        .x((d,i) => xScale(i+1)+28) 
        .y((d) =>  120-yScale(d) ) 
        .curve(d3.curveMonotoneX)
        
        chart.append("path")
        .datum(allSessions) 
        .attr("class", "line") 
        //.attr("transform", "translate(" + 100 + "," + 100 + ")")
        .attr("d", line)
        .style("fill", "none")
        .style("stroke", "#CC0000")
        .style("stroke-width", "2");




  }

  return (
    <div className={sessionCss.main}>
      <p>Durée moyenne des sessions</p>
      <div id="session__chart">
        dlnljdnsèlsfggèl
      </div>

    </div>
  )
}


export default Session;
