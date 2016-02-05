'use strict';

function parseLine(line){
  var info=line.split(/\s\s+/);
  var ports="";
  var names=info[5];

  if(info.length==8){
    ports=info[5];
    names=info[6];
  }

  var container={
    id:info[0],
    image:info[1],
    command:info[2],
    created:info[3],
    status:info[4],
    ports:ports,
    names:names
  }

  return container;
}

module.exports={
  parse:function(data){
    var containers=[];
    var fields = data.split('\n');
    fields.splice(0,1); //Remove Header
    fields.splice(-1,1); //Remove last empty line
    fields.forEach(function(line){
        var container=parseLine(line);
        containers.push(container);
    });
    return containers;
  }
}
