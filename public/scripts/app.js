angular.module('myApp',[])
.controller('MainCtrl',function($scope, Docker){
  $scope.container={};
  $scope.containers=[];

  Docker.exited().then(function(containers){
    containers=containers.data;
    var arr = [];
    for (var prop in containers) {
      arr.push(containers[prop]);
    }
    $scope.data={
      nodes:arr,
      links:[]
    };

    var graph=$scope.data;

    var width = 500;
    height = 500;

    var force = d3.layout.force()
    .charge(-180)
    .linkDistance(30)
    .size([width, height]);

    var svg = d3.select("#canvas").append("svg")
    .attr("width", "100%")
    .attr("height", "100%");

    var main = svg.append("g")
    .attr("class", "graph");

    force
    .nodes(graph.nodes)
    .links(graph.links)
    .start();

    var link = main.selectAll(".link")
    .data(graph.links)
    .enter().append("line")
    .attr("class", "link")
    .style("stroke-width", function(d) { return 2 * d.strength; });

    var node = main.selectAll(".node_circle")
    .data(graph.nodes)
    .enter().append("circle")
    .attr("class", "node_circle")
    .attr("r", function(d) { return 0.5 * Math.sqrt(1695); })
    .style("fill", function(d){ return "hsl(" + Math.random() * 360 + ",100%,50%)"; } )
    .on("mouseover", function(d) { mouseover_node(d); })
    .on("mouseout", function(d) { mouseout_node(d) })
    .call(force.drag);

    var label = main.selectAll(".node_label")
    .data(graph.nodes)
    .enter().append("text")
    .attr("class", "node_label")
    .attr("dx", function(d) { return 2 + 0.5 * Math.sqrt(1695); })
    .attr("dy", ".4em")
    .attr("font-family", "Verdana")
    .attr("font-size", 10)
    .style("fill", "#000000")
    .text(function(d) { return d.names; });

    force.on("tick", function() {
      link.attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

      node.attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; });

      label.attr("x", function(d) { return d.x; })
      .attr("y", function(d) { return d.y; });
    });

    var mouseover_node = function(z){
      $scope.$apply(function(){
        $scope.container={
          id:z.id,
          name:z.names,
          created_at:z.created,
          ports:z.ports,
          image:z.image,
          command:z.command,
          status:z.status
        }
      })
    };

    var mouseout_node = function(z){
      link
      .style("stroke-opacity", 0.2);

      node
      .style("stroke-width", 1)

      label
      .attr("font-size", 10)
      .style("fill-opacity", 1)

    };
  });


});
