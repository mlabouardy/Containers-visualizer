var express=require('express'),
    logger=require('morgan'),
    path=require('path'),
    Docker=require('./docker'),
    app=express();

app.use(logger('dev'));
app.use(express.static(path.join(__dirname,'public')));

app.get('/api/v1/running',function(req,res){
    Docker.getRunningContainers(function(containers){
      res.send(containers);
    });
});

app.get('/api/v1/exited',function(req,res){
  Docker.getExitedContainers(function(containers){
    res.send(containers);
  });
});

app.listen(3000,function(){
  console.log('Server listening ...');
});
