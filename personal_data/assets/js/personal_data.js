var margin = {top: 10, right: 10, bottom: 100, left: 40},
    margin2 = {top: 430, right: 10, bottom: 20, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom,
    height2 = 500 - margin2.top - margin2.bottom;

var parseDate = d3.time.format("%Y-%m-%d").parse;

var x = d3.time.scale().range([0, width]),
    x2 = d3.time.scale().range([0, width]),
    y = d3.scale.linear().range([height, 0]),
    y2 = d3.scale.linear().range([height2, 0]);

var xAxis = d3.svg.axis().scale(x).orient("bottom"),
    xAxis2 = d3.svg.axis().scale(x2).orient("bottom"),
    yAxis = d3.svg.axis().scale(y).orient("left");

var brush = d3.svg.brush()
    .x(x2)
    .on("brush", brushed);

var area = d3.svg.area()
    .interpolate("monotone")
    .x(function(d) { return x(d.date); })
    .y0(height)
    .y1(function(d) { return y(d.commits); });

var area2 = d3.svg.area()
    .interpolate("monotone")
    .x(function(d) { return x2(d.date); })
    .y0(height2)
    .y1(function(d) { return y2(d.commits); });

var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

svg.append("defs").append("clipPath")
    .attr("id", "clip")
  .append("rect")
    .attr("width", width)
    .attr("height", height);

var focus = svg.append("g")
    .attr("class", "focus")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var context = svg.append("g")
    .attr("class", "context")
    .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

d3.csv("data/repos.csv", type, function(error, data) {
  x.domain(d3.extent(data.map(function(d) { return d.date; })));
  y.domain([0, d3.max(data.map(function(d) { return d.commits; }))]);
  x2.domain(x.domain());
  y2.domain(y.domain());

  focus.append("path")
      .datum(data)
      .attr("class", "area")
      .attr("d", area);

  focus.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  focus.append("g")
      .attr("class", "y axis")
      .call(yAxis);

  context.append("path")
      .datum(data)
      .attr("class", "area")
      .attr("d", area2);

  context.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height2 + ")")
      .call(xAxis2);

  context.append("g")
      .attr("class", "x brush")
      .call(brush)
    .selectAll("rect")
      .attr("y", -6)
      .attr("height", height2 + 7);
});

function brushed() {
  x.domain(brush.empty() ? x2.domain() : brush.extent());
  focus.select(".area").attr("d", area);
  focus.select(".x.axis").call(xAxis);
}

function type(d) {
  d.date = parseDate(d.date);
  d.commits = +d.commits;
  return d;
}

var categories2 = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sabado'];

var commits2 = [1, 26, 29, 57, 46, 59, 0];

var colors2 = ['#0082ca','#0082ca','#0082ca','#0082ca','#0082ca','#0082ca','#0082ca'];

var grid = d3.range(0).map(function(i){
  return {'x1':0,'y1':30,'x2':0,'y2':480};
});

var tickVals = grid.map(function(d,i){
  if(i>0){ return i*10; }
  else if(i===0){ return "100";}
});

var xscale2 = d3.scale.linear()
        .domain([10,70])
        .range([0,722]);

var yscale2 = d3.scale.linear()
        .domain([0,categories2.length])
        .range([30,480]);

var colorScale2 = d3.scale.quantize()
        .domain([0,categories2.length])
        .range(colors2);

var canvas2 = d3.select('#wrapper')
        .append('svg')
        .attr({'width':900,'height':700});

var grids2 = canvas2.append('g')
          .attr('id','grid')
          .attr('transform','translate(150,10)')
          .selectAll('line')
          .data(grid)
          .enter()
          .append('line')
          .attr({'x1':function(d,i){ return i*30; },
             'y1':function(d){ return d.y1; },
             'x2':function(d,i){ return i*30; },
             'y2':function(d){ return d.y2; },
          })
          .style({'stroke':'#adadad','stroke-width':'1px'});

var xAxis3 = d3.svg.axis();
  xAxis3
    .orient('bottom')
    .scale(xscale2)
    .tickValues(tickVals);

var yAxis2 = d3.svg.axis();
  yAxis2
    .orient('left')
    .scale(yscale2)
    .tickSize(2)
    .tickFormat(function(d,i){ return categories2[i]; })
    .tickValues(d3.range(7));

var y_xis2 = canvas2.append('g')
          .attr("transform", "translate(150,0)")
          .attr('id','yaxis2')
          .call(yAxis2);

var chart2 = canvas2.append('g')
          .attr("transform", "translate(150,0)")
          .attr('id','bars')
          .selectAll('rect')
          .data(commits2)
          .enter()
          .append('rect')
          .attr('height',40)
          .attr({'x':0,'y':function(d,i){ return yscale2(i); }})
          .style('fill',function(d,i){ return colorScale2(i); })
          .attr('width',function(d){ return 0; });


var transit2 = d3.select("#wrapper").select("svg").selectAll("rect")
            .data(commits2)
            .transition()
            .duration(1000) 
            .attr("width", function(d) {return xscale2(d); });

var transitext2 = d3.select('#bars')
          .selectAll('text')
          .data(commits2)
          .enter()
          .append('text')
          .attr({'x':function(d) {return xscale2(d)-30; },'y':function(d,i){ return yscale2(i)+20; }})
          .text(function(d){ return d; }).style({'fill':'#fff','font-size':'14px'});