var svg = d3.select('body')
              .append('svg')
              .attr('width', WIDTH)
              .attr('height', HEIGHT);

d3.json(MAP_PATH + '/' + COUNTRY + '.topojson', function(data) {
    var map = topojson.object(data, data.objects[COUNTRY]).geometries
    var projection = d3.geo.mercator()
        .center([137, 34])
        .translate([WIDTH/2, HEIGHT/2])
        .scale(1000);
    var path = d3.geo.path()
        .projection(projection);
 
    svg.selectAll('path')
        .data(map)
        .enter()
        .append('path')
        .attr('d', path); 
});
