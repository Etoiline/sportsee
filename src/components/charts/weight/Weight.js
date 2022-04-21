import * as d3 from 'd3'

function Weight(props) {
  console.log("appel weight")
  // Set of data
  var dataset = [31, 64, 42, 28, 16, 32, 64, 10];
  // Create our SVG container with grey background
  var svg = d3.select("#test")
            .append("svg")
            .attr("width", 200)
            .attr("height", 100)
            .style('background-color', 'lightgrey')
  
  // Bind data to chart, and create bars
svg.selectAll('.bar')
.data(dataset)
.enter()
.append('rect')
.attr('x', (d,i) => i*25 ) //coordonnée en x de chaque rectangle. d donnée courante et i index de d
                          // i*25 car 200px et 8 données : 200/8=25
.attr('y', (d) => 100-d) //100px de hauteur et mirroir vertical 
.attr('width', 20)
.attr('height', (d) => d) //hauteur du rectangle = valeur de la donnée




  return (
    <div id="test">

    </div>
  );
}

export default Weight;
