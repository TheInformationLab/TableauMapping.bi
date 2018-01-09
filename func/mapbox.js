var request = require("request");
var crypto = require("crypto");
var async = require("async");

var mapbox = {}

mapbox.upload = function(name, country, geojson, callback) {
  createDataset(function(id) {
    updateDataset(id, name, country, function(meta) {
      var features = geojson.features;
      console.log(features.length);
      var completeCount = 0;
      async.eachSeries(features, function(item, done) {
        addFeature(id, item, function(resp) {
          if (resp.message) {
            console.log("Bad");
          }
          console.log(item.geometry.type)
          done();
        });
      }, function(err) {
        if (err) console.log(err);
        callback(meta);
      });
    });
  });
}

mapbox.getDataset = function(id, username, accessToken, callback, paged, next) {
  if (next) {
    var url = next;
  } else {
    var url = 'https://api.mapbox.com/datasets/v1/'+username+'/'+id+'/features'
  }
  var options = { method: 'GET',
    url: url,
    qs: { access_token: accessToken } };
  request(options, function (error, response, body) {
    if (error) console.log(error);
    var resp = JSON.parse(body);
    if (paged) {
      resp.features = paged.concat(resp.features);
    }
    var headerLink = response.headers.link;
    var tstReg = /(?:<)([\s\S]+)(?:>; rel="next")/g;
    var nextUrl = tstReg.exec(headerLink);
    if (nextUrl && nextUrl[1].length > 0) {
      mapbox.getDataset(id, username, accessToken, callback, resp.features, nextUrl[1]);
    } else {
      callback(resp);
    }
  });
}

mapbox.getDatasets = function(username, accessToken, callback) {
  retrieveDatasets(username, accessToken, function(datasets) {
    callback(datasets);
  });
}

mapbox.getMeta = function(id, callback) {
  retrieveDataset(id, function(meta) {
    callback(meta);
  });
}

mapbox.delete = function(id, callback) {

}

module.exports = mapbox;

var retrieveDatasets = function(username, accessToken, callback, paged, next) {
  var options = { method: 'GET',
    url: 'https://api.mapbox.com/datasets/v1/'+username+'/',
    qs: { access_token: accessToken } };
  request(options, function (error, response, body) {
    if (error) console.log(error);
    var resp = JSON.parse(body);
    if (paged) {
      resp = paged.concat(resp);
    }
    var headerLink = response.headers.link;
    var tstReg = /(?:<)([\s\S]+)(?:>; rel="next")/g;
    var nextUrl = tstReg.exec(headerLink);
    if (nextUrl && nextUrl[1].length > 0) {
      retrieveDatasets(username, accessToken, callback, resp, nextUrl[1]);
    } else {
      callback(resp);
    }
  });
}

var createDataset = function(callback) {
  var options = { method: 'POST',
    url: 'https://api.mapbox.com/datasets/v1/infolabuk-dev',
    qs: { access_token: token } };
  request(options, function (error, response, body) {
    if (error) console.log(error);
    callback(JSON.parse(body).id);
  });
}

var retrieveDataset = function(id, callback) {
  var options = { method: 'GET',
    url: 'https://api.mapbox.com/datasets/v1/infolabuk-dev/'+ id,
    qs: { access_token: token } };
  request(options, function (error, response, body) {
    if (error) console.log(error);
    callback(JSON.parse(body));
  });
}

var updateDataset = function(id, name, country, callback) {
  var options = { method: 'PATCH',
    url: 'https://api.mapbox.com/datasets/v1/infolabuk-dev/' + id,
    qs: { access_token: token },
    headers:
     { 'content-type': 'application/json' },
    body: { "name": name, "description": country },
    json: true };

  request(options, function (error, response, body) {
    if (error) console.log(error);
    callback(body);
  });
}

var addFeature = function(id, feature, callback) {
  var featureid = crypto.randomBytes(20).toString('hex');
  var options = { method: 'PUT',
    url: 'https://api.mapbox.com/datasets/v1/infolabuk-dev/'+id+'/features/' + featureid,
    qs: { access_token: token },
    headers:
     { 'content-type': 'application/json' },
    body: feature,
    json: true };

  request(options, function (error, response, body) {
    if (error)console.log(error);
    callback(body);
  });

}
