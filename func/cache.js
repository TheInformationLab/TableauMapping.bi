var mongoose = require('mongoose');
var Spatial = require('../models/spatial');
var User = require('../models/user');
var mapbox = require('./mapbox');
var async = require('async');
var fs = require('fs');


var d = new Date();
var firstLog = {};
firstLog.date = d.toISOString();
firstLog.msg = "Caching started";

fs.writeFileSync('/tmp/caching.txt',JSON.stringify(firstLog));
var logger = fs.createWriteStream('/tmp/caching.txt', {
  flags: 'a' // 'a' means appending (old data will be preserved)
})

var writeLog = function(message) {
  var d = new Date();
  var log = {};
  log.date = d.toISOString();
  log.msg = message;
  logger.write(","+JSON.stringify(log));
}

var options = { useMongoClient : true };

var dbhost = process.env.HOST || 'localhost:27017/tableau-mapping2';
var dbuser = process.env.DBUSER || null;
var dbpass = process.env.DBPASS || null;
var dburi = 'mongodb://';

if (dbuser && dbpass) {
  dburi = dburi + dbuser + ":" + dbpass + '@' + dbhost;
} else {
  dburi = dburi + dbhost;
}

mongoose.connect(dburi, options);

var query = Spatial.find({"name": { $ne: "The Information Lab" }}).select('name');

query.exec(function (err, spatials) {
  if (err) {
    writeLog(JSON.stringify(err));
    mongoose.connection.close();
    return;
  }
  let taskList = [];
  for (let spatial of spatials) {
    taskList.push({"id": spatial._id});
  }
  if(!fs.existsSync('/tmp/data')) {
    fs.mkdirSync('/tmp/data');
  }
  var q = async.queue(function(task, callback) {
    getData(task.id, function(err,data) {
      if (err != null && err!= {}) {
        writeLog(JSON.stringify(err));
        mongoose.connection.close()
        return;
      }
      fs.writeFile('/tmp/data/' + task.id, JSON.stringify(data), 'utf8', function() {
        writeLog( task.id + " cache written");
        callback();
      });
    });
  }, 1);

  q.drain = function() {
    writeLog('all items cached');
    mongoose.connection.close();
    process.exit();
  };

  for (var i = 0; i < taskList.length; i++) {
    q.push(taskList[i], function(err) {
      if(err) {
        writeLog(JSON.stringify(err));
      }
    });
  }

});

var getData = function(id, callback) {
  writeLog("Getting " +id);
  Spatial.findById(mongoose.Types.ObjectId(id))
         .populate('owner')
         .exec(function (err, resp) {
           if (err != null && err!= {}) {
             writeLog(JSON.stringify(err));
             mongoose.connection.close()
             return;
           }
            mapbox.getDataset(resp.mapboxid, resp.owner.mapboxUsername, resp.owner.mapboxAccessToken, function(geojson) {
              callback(null, geojson);
            });
          });
}
