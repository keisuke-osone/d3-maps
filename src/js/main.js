var svg = d3.select('body')
              .append('svg')
              .attr('width', WIDTH)
              .attr('height', HEIGHT);

d3.json(MAP_PATH + '/' + COUNTRY + '.topojson', function(data) {
    var map = topojson.object(data, data.objects[COUNTRY]).geometries
    var projection = d3.geo.mercator()
        .center([135.0, 35.0])
        .translate([WIDTH/2, HEIGHT/2])
        .scale(1000);
    var path = d3.geo.path()
        .projection(projection);
 
    svg.selectAll('path')
        .data(map)
        .enter()
        .append('path')
        .attr('d', path)
        .style("fill", function(d) {
            console.log(d.properties.name_local);
            if (d.properties.name_local == '沖縄県') {
                d3.select(this)
                    .attr('transform', function (d) {
                        var scale = 1
                        var position = [143.47977536793618, 31.160649678847047];
                        return "scale(" + scale + ") translate(" + 
                            (1.0 * projection(position)[0] - scale * (path.centroid(d)[0])) / scale + 
                            "," +
                            (1.0 * projection(position)[1] - scale * (path.centroid(d)[1])) / scale + 
                            ")";
                    });
                return 'rgb(200,150,150)';
            }
            return 'rgb(200,200,200)';
        });

    var separateLineParameters =
        {"type": "LineString", "coordinates": [
                    [147.9488461699566, 34],
                    [141.81819776205677, 34],
                    [137, 30.02631650109769],
                    [137, 24.42545452976434]
        ]};

    var separateLine = svg.selectAll(".separateLines")
            .data([separateLineParameters])
            .enter()
            .append("path")
            .attr({
                "class":"line",
                "d": path,
                "fill": "none",
                "stroke": "#222",
                "stroke-width": 2.5
            });

    //クリックした位置の緯度経度を取得  
    d3.select("svg").on("mousedown.log", function() {
        console.log(projection.invert(d3.mouse(this)));
        d3.select('.resllut').text("results:" + projection.invert(d3.mouse(this)));
    });
});

