const { fetchMyIP, fetchCoordssByIP } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
});

fetchCoordssByIP('72.137.62.2', (error, data) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  
  console.log("Coordinates: ", data);
});