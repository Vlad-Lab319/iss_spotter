const request = require('request-promise-native');

const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordssByIP = function(ip) {
  let ipParsed = JSON.parse(ip).ip
  return request(`https://freegeoip.app/json/${ipParsed}`);

};

const fetchISSFlyOverTimes = function(data) {
  let parsedData = JSON.parse(data);
  let coordinates = { latitude: JSON.parse(data).latitude, longitude: parsedData.longitude };
  return request(`http://api.open-notify.org/iss-pass.json?lat=${coordinates.latitude}&lon=${coordinates.longitude}`);

}

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
  .then(fetchCoordssByIP)
  .then(fetchISSFlyOverTimes)
  .then(body => {
      console.log(body)
      return body;
    }
    );
};

module.exports = { fetchMyIP, fetchCoordssByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };