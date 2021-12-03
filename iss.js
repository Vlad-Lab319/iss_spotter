const request = require('request');

const fetchMyIP = function(callback) { 
  // use request to fetch IP address from JSON API
  request('https://api.ipify.org?format=json', (error, response ,ip) => {
    
    callback(error, ip);
  });
  
}
  


module.exports = { fetchMyIP };
