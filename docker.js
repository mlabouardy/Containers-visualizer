var Parser=require('./parser');
           require('shelljs/global');

module.exports={
  getRunningContainers:function(callback){
    exec('sudo docker ps',{silent:true},function(code,stdout,sterr){
      var containers=Parser.parse(stdout);
      callback(containers);
    });
  },
  getExitedContainers:function(callback){
    exec('sudo docker ps --filter "status=exited"',{silent:true},function(code,stdout,sterr){
      var containers=Parser.parse(stdout);
      callback(containers);
    });
  }
}
