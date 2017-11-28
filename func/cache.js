var mongoose = require('mongoose');
var Spatial = require('../models/spatial');
var SearchIndex = require('../models/index');
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

mongoose.connect('mongodb://tableaumapping:6WcrEB^wx3lBahygNKvC7vcKX2ssBD94@ds129491-a0.mlab.com:29491,ds129491-a1.mlab.com:29491/tableaumappingprod?replicaSet=rs-ds129491', options);

var query = Spatial.find({"name": { $ne: "The Information Lab" }}).select('name');

query.exec(function (err, spatials) {
  if (err) {
    writeLog(JSON.stringify(err));
    mongoose.connection.close();
    return;
  }
  let taskList = [];
  for (let spatial of spatials) {
    taskList.push({"id": spatial._id, "type": "GeoJSON"});
    taskList.push({"id": spatial._id, "type": "TabData"});
  }
  if(!fs.existsSync('/tmp/GeoJSON')) {
    fs.mkdirSync('/tmp/GeoJSON');
  }
  if(!fs.existsSync('/tmp/TabData')) {
    fs.mkdirSync('/tmp/TabData');
  }
  var q = async.queue(function(task, callback) {
    getData(task.id, task.type, function(err,data) {
      if (err != null && err!= {}) {
        writeLog(JSON.stringify(err));
        mongoose.connection.close()
        return;
      }
      fs.writeFile('/tmp/' + task.type + '/' + task.id, JSON.stringify(data), 'utf8', function(err) {
        writeLog(task.type + '/' + task.id + " cache written");
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

var getData = function(id, type, callback) {
  writeLog("Getting " + type + " " +id);
  Spatial.findById(mongoose.Types.ObjectId(id), function (err, resp) {
    for (var i = 0; i < resp.attachments.length; i++) {
      var rec = i;
      var attachment = resp.attachments[rec];
      var fileName = attachment.filename;
      if (fileName.substring(0, 7) === type) {
        var foundId = rec;
        writeLog(type +" found");
        resp.loadSingleAttachment(fileName)
          .then(function(doc) {
            var buf = doc.attachments[foundId].buffer
            var b = new Buffer(buf.toString("utf-8"), 'base64')
            var s = b.toString();
            writeLog("Sending response");
            callback(null, JSON.parse(s));
          })
          .catch(function(err) {
            //mongoose.connection.close();
            callback(err, null);
          });
      }
    }
  });
}
