const request = require('request');

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request('https://api.ipify.org?format=json', (error, response, ip) => {
    
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${ip}`;
      callback(Error(msg), null);
      return;
    }

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

    callback(error, coordinates);
  });

};
  


module.exports = { fetchMyIP, fetchCoordssByIP };
