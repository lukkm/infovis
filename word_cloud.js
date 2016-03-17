var fontMinSize = 10;
var fontMaxSize = 100;

var stop_words = ["and", "the", "with", "for", "to", "of", "in", "from", "a", "can", "but", "get", "an", "so",
 "are", "has", "is", "or", "it"];

d3.json("word_cloud.json", function (data) {
    /**
     * http://stackoverflow.com/questions/16244857/d3-js-data-filtering
     */
    wordMap(data.filter(function(d) {
        return stop_words.indexOf(d.word) === -1;
    }));
});

function wordMap(data) {
    /**
     * http://bl.ocks.org/azza-bazoo/9381206#wordcloud-static.html
     * one of D3's built-in scales, with 10 more-or-less random (but reasonable) colours
     */
    var fill = d3.scale.category10();

    var scale = d3.scale.linear().domain([min(data),max(data)]).range([fontMinSize,fontMaxSize]);

    d3.select("#word_cloud")
        .selectAll()
        .data(data)
        .enter()
        .append("text")
        .style("font-size", function (d, i) {
            return scale(d.count) + "px";
        })
        .style("color",function(d, i) {
            return fill(i);
        })
        .style("font-family", "Impact, sans-serif")
        .style("display", "inline-block")
        .text(function (d, i) {
            return d.word;
        });
}

function min(data) {
    return d3.min(data, function(d) {
        return d.count;
    });
}

function max(data) {
    return d3.max(data, function(d) {
        return d.count;
    });
}