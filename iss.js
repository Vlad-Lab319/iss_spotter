const request = require('request');

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request('https://api.ipify.org?format=json', (error, response, body) => {
    
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
  
};

const fetchCoordssByIP = function(ip, callback) {
  request(`https://freegeoip.app/json/${ip}`, (error, response, data) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching Coordinates for IP: ${data}`), null);
      return;
    }

    let parsedData = JSON.parse(data);

    let coordinates = { latitude: JSON.parse(data).latitude, longitude: parsedData.longitude };

    callback(null, coordinates);
  });

};

const fetchISSFlyOverTimes = function(lat, lon, callback) {
  request(`https://iss-pass.herokuapp.com/json/?lat=${lat}&lon=${lon}`, (error, response, data) => {

    let parsedData = JSON.parse(data);

    callback(error, parsedData.response);
  });

};
  
const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordssByIP(ip, (error, data) => {
      if (error) {
        return callback(error, null);
      }
      fetchISSFlyOverTimes(data.latitude, data.longitude, (error, passTimes) => {
        if (error) {
          return callback(error, null);
        }
       
        callback(null, passTimes);
        });
      });
    });
  
};

module.exports = { nextISSTimesForMyLocation };

