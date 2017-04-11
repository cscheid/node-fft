function pad(v, n) {
    v = v.slice();
    for (var i=0; i<n; ++i)
        v.push(0);
    return v;
}

function main() {
    var f = 1;
    var n = 64;
    var a1   = fft.gaussianKernel(n, 1);
    var data = [1,0,0.5,0,0.25,0,0,0,0.8];
    data = pad(data, n-data.length);
    // var result = fft.convolve(data, a1);
    // filtered = result;

    var result = fft.gaussianBlur(data, 1);

    var x = d3.scaleLinear().domain([-1, n]).range([0, 600]);
    var y = d3.scaleLinear().domain([-1.5, 1.5]).range([300, 0]);
    var svg = d3.select("#test")
            .append("svg")
            .attr("width", 600)
            .attr("height", 300);

    svg.append("g").append("line").attr("x1", 0).attr("x2", 600).attr("y1", 150).attr("y2", 150)
        .attr("stroke", "black");

    var g = svg.append("g");
    g.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function(d, i) { return x(i); })
        .attr("cy", function(d, i) { return y(d); })
        .attr("r", 5)
        .attr("fill", "blue");


    // 8 -> 6
    // 16 -> 10
    // 32 -> 18
    // 64 -> 34
    
    var g2 = svg.append("g");
    g2.selectAll("circle")
        .data(result) // 18, 50))
        .enter()
        .append("circle")
        .attr("cx", function(d, i) { return x(i); })
        .attr("cy", function(d, i) { return y(d); })
        .attr("r", 5)
        .attr("fill", "red");
}

main();
