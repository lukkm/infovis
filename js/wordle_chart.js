var json = JSON.parse("[\r\n{\"title\": \"I felt creative\", \"values\": {\"Agree\": 88, \"Neutral\": 8, \"Disagree\": 4}},\r\n{\"title\": \"I felt an emotional reaction\", \"values\": {\"Agree\": 66, \"Neutral\": 22, \"Disagree\": 12}},\r\n{\"title\": \"I learned something new about the text\", \"values\": {\"Agree\": 63, \"Neutral\": 24, \"Disagree\": 13}},\r\n{\"title\": \"It confirmed my understanding of the text\", \"values\": {\"Agree\": 57, \"Neutral\": 33, \"Disagree\": 10}},\r\n{\"title\": \"It jogged my memory\", \"values\": {\"Agree\": 50, \"Neutral\": 35, \"Disagree\": 15}},\r\n{\"title\": \"The Wordle confused me\", \"values\": {\"Agree\": 5, \"Neutral\": 9, \"Disagree\": 86}}\r\n]");

/*d3.json("../data/wordle_chart.json", function (data) {
    showChart(data);
});*/

showChart(json);

function showChart(data) {
	var svg = d3.select("body").append("svg");

	var width = 3000, barHeight = 50;

	var x = d3.scale.linear().range([0, width]);

	svg.attr("width", width).attr("height", barHeight * data.length);

	x.domain([0, 100]);

	svg.selectAll("rect1")
		.data(data)
		.enter()
		.append("rect")
	    .attr("width", function(d) { return x(d.values.Agree); })
	    .attr("height", barHeight - 1)
	    .attr("x", 300)
	    .attr("y", function(d, i) { return barHeight * i; } )
	    .attr("fill", "green");

	svg.selectAll("rect2")
		.data(data)
		.enter()
		.append("rect")
	    .attr("width", function(d) { return x(d.values.Neutral); })
	    .attr("height", barHeight - 1)
	    .attr("x", function (d) { return 300 + x(d.values.Agree); } )
	    .attr("y", function(d, i) { return barHeight * i; } )
	    .attr("fill", "gray");

	svg.selectAll("rect3")
		.data(data)
		.enter()
		.append("rect")
	    .attr("width", function(d) { return x(d.values.Disagree); })
	    .attr("height", barHeight - 1)
	    .attr("x", function (d) { return 300 + x(d.values.Agree) + x(d.values.Neutral); } )
	    .attr("y", function(d, i) { return barHeight * i; } )
	    .attr("fill", "red");

    svg.selectAll("text")
		.data(data)
		.enter()
		.append("text")
        .attr("x", function(d) { return 10; })
        .attr("y", function(d, i) { return i * barHeight + barHeight / 2; })
        .text(function(d) { return d.title; });
}
