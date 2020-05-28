var request = require("request");

var mapbox = {}

mapbox.getDataset = function(id, username, accessToken, callback, paged, next) {
  var url = 'https://api.mapbox.com/datasets/v1/'+username+'/'+id+'/features'
  if (next) {
    url = next;
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

mapbox.getMeta = function(id, username, accessToken, callback) {
  retrieveDataset(id, username, accessToken, function(meta) {
    console.log(meta);
    callback(meta);
  });
}

module.exports = mapbox;

var retrieveDatasets = function(username, accessToken, callback, paged, next) {
  var url = 'https://api.mapbox.com/datasets/v1/'+username+'/';
  if (next) {
    url = next;
  }
  var options = { method: 'GET',
    url: url,
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

var retrieveDataset = function(id, username, accessToken, callback) {
  var options = { method: 'GET',
    url: 'https://api.mapbox.com/datasets/v1/'+ username +'/'+ id + '/features',
    qs: { access_token: accessToken } };
  request(options, function (error, response, body) {
    if (error) console.log(error);
    callback(JSON.parse(body));
  });
}
