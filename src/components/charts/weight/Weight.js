import * as d3 from 'd3'

function Weight() {
  var svg = d3.select("#test")
            .append("svg")
            .attr("width", 300)
            .attr("height", 200)
            .style('background-color', 'lightgrey')
  //d3.select("#test").append("p").text("Hellooo World!");
  return (
    <div id="test">

    </div>
  );
}

export default Weight;
