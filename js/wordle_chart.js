d3.json("../data/wordle_chart.json", function (data) {
    showChart(data);
});

function showChart(data) {
	var width = 420,
    barHeight = 20;

	var x = d3.scale.linear()
	    .domain([0, d3.max(function(d) { return d.values.Agree; })])
	    .range([0, width]);

	var chart = d3.select(".chart")
	    .attr("width", width)
	    .attr("height", barHeight * data.length);

	var bar = chart.selectAll("g")
	    .data(data)
	  .enter().append("g")
	    .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

	bar.append("rect")
	    .attr("width", function(d) { return d.values.Agree; })
	    .attr("height", barHeight - 1);

	bar.append("text")
	    .attr("x", function(d) { return x(d.values.Agree) - 3; })
	    .attr("y", barHeight / 2)
	    .attr("dy", ".35em")
	    .text(function(d) { return d.title; });
}
