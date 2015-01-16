var fs = require('fs');
var path = require('path');
var http = require('http');

exports.problem = fs.createReadStream(__dirname + '/problem.txt');
exports.solution = fs.createReadStream(__dirname + '/solution.txt');

exports.verify = function (args, cb) {
  var apiOptions,
      apiCallback;
      // res = require(path.resolve(args[0]));

  // set up a call to the api
  apiOptions = {
    host: 'api.clue.io',
    path: 'a2/siginfo?q={"pert_desc":"sirolimus","cell_id":"MCF7"}&user_key=lincsdemo'
  }
  apiCallback = function(res) {
    var resjson,
        apiResponse = '';

    res.on('data',function(chunk){
      apiResponse += chunk;
    });

    res.on('end',function(){
      resjson = json.parse(apiResponse);
      if (resjson.pert_iname === 'sirolimus') {
        console.log('That sounds about right!\n');
        cb(true);
      } else {
        console.log('That looks a little different than what we would expect!\n');
        cb(false);
      }
    })
  }

  http.get(apiOptions,apiCallback);

};
