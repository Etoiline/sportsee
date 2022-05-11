import * as d3 from 'd3'
import { useSportSeeAPISession } from '../../../services/sportseeAPI';
import sessionCss from './Session.module.css'
import { useEffect, useState, useContext } from "react"
import { SrcContext } from '../../../services/SrcProvider';

function Session(props) {
  //console.log("weight")
  const context = useContext(SrcContext)
  const source = context.dataSource
  const { loadingSession, dataSession, errorSession } = useSportSeeAPISession(props.id, source)

  const [durationSession, setDataSession] = useState([])


  useEffect(() => {
    if (loadingSession === false) {
      setDataSession(dataSession.sessions)

    }

  }, [loadingSession, dataSession])


  useEffect(() => {
    if (durationSession.length > 0) {
      createSessionChart()
    }
  }, [durationSession])

  function createSessionChart() {
    document.getElementById('session__chart').innerHTML = ''


    //extraction des sessions
    const allSessions = durationSession.map(elt => elt.sessionLength)

    //on ajoute deux éléments : un au début et un à la fin 
    //ils seront en dehors du graphique mais permettront une ligne continue (avant j1 et après j7)
    const prevDuration = 2 * allSessions[0] - allSessions[1]
    const nextDuration = 2 * allSessions[allSessions.length - 1] - allSessions[allSessions.length - 2]
    let extrasSessions = []
    extrasSessions.push(prevDuration)
    extrasSessions = extrasSessions.concat(allSessions)
    extrasSessions.push(nextDuration)

    let chart = d3.select("#session__chart")
      .append("svg")
      .attr('class', 'svg_session_chart')
      .attr('height', '280px')
      .attr('width', '266px')


    //title
    chart.append('text')
      .attr('x', 100)
      .attr('y', 50)
      .attr('width', '200px')
      .attr('fill', 'white')
      .attr('opacity', "50.4%")
      .attr('text-anchor', 'middle')
      .style('font-family', 'Roboto')
      .style('font-size', 15)
      .text('Durée moyenne des sessions')

    //fonction de remplissage des abscisses
    const xScale = d3.scaleLinear()
      .domain([1, 7])
      .range([0, 220])
    const abscisse = ['L', 'M', 'M', 'J', 'V', 'S', 'D']
    for (let i = 1; i < 8; i++) {
      chart.append("svg:text")
        .attr("x", xScale(i) + 20)
        .attr("y", 250)
        .text(abscisse[i - 1])
        .attr('fill', 'white')
        .attr('opacity', "50.4%")
    }

    // Add Y axis
    var yScale = d3.scaleLinear()
      .domain([0, Math.max(...durationSession.map(elt => elt.sessionLength))])
      .range([0, 100])

    //add the line
    var line = d3.line()
      .x((d, i) => xScale(i) + 28)
      .y((d) => 220 - yScale(d))
      .curve(d3.curveMonotoneX)


    chart.append("path")
      .datum(extrasSessions)
      .attr("class", "line")
      .attr("d", line)
      .style("fill", "none")
      .style("stroke", "#FFF")
      .style("opacity", "0.5")
      .style("stroke-width", "2");

    // Add the dot and bubbles
    for (let index = 1; index < extrasSessions.length - 1; index++) {
      let duration = extrasSessions[index]
      let decalage = 0 //permet d'afficher la durée à droite pour la dernière valeur (sinon dépasse du cadre)
      if (index === extrasSessions.length - 2) {
        decalage = 50
      }

      let group = chart.append("g")
        .attr("id", "session" + index)
        .attr("class", "linear_dots")
      group.append("svg:rect")
        .attr("class", "session_on_hover")
        .attr("x", xScale(index) + 28)
        .attr("y", 0)
        .attr("width", "100%")
        .attr("height", 300)
        .attr("fill", "#000")
        .attr("opacity", "0")
      group.append("svg:rect")
        .attr("x", xScale(index) + 34 - decalage)
        .attr("y", 220 - yScale(duration) - 35)
        .attr("width", 40)
        .attr("height", 25)
        .attr("fill", "#FFF")
        .attr("opacity", "0")
      group.append("svg:text")
        .attr("x", xScale(index) + 54 - decalage)
        .attr("y", 220 - yScale(duration) - 20)
        .style("text-anchor", "middle")
        .style("font-size", "8px")
        .text(duration + "min")
        .attr("opacity", "0")
      group.append("svg:circle")
        .attr("cx", xScale(index) + 28)
        .attr("cy", 220 - yScale(duration))
        .attr("r", 3)
        .attr("stroke-width", "4")
        .style("fill", "#FFF")
        .style("stroke", "#FFFFFF80")
        .attr("opacity", "0")
      // hitbox
      chart.append("svg:rect")
        .attr("x", xScale(index) + 8)
        .attr("y", 0)
        .attr("width", 41)
        .attr("height", 300)
        .attr("opacity", "0")
        // make it appear on hover + make the infos appears
        .on("mouseover", function () {
          d3.selectAll(`#session${index} > *`).transition()
            .attr("opacity", "1")
          d3.selectAll(`#session${index} > .session_on_hover`).transition()
            .attr("opacity", "0.1")
        })
        .on("mouseout", function () {
          d3.selectAll(`#session${index} > *`).transition()
            .attr("opacity", "0")
        })
    }
    // chart.append('g')
    // .attr("class", "linear_dots")
    //     .selectAll("dot")
    //     .data(extrasSessions)
    //     .enter()
    //     .append("circle")
    //     .attr("cx",  (d,i) => xScale(i)+28 )
    //     .attr("cy", (d) =>  220-yScale(d) )
    //     .attr("r", 2)
    //     .style("fill", "#000")



  }

  return (
    <div className={sessionCss.main}>
      <div id="session__chart">

      </div>

    </div>
  )
}


export default Session;
