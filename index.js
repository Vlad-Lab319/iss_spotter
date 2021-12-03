const { nextISSTimesForMyLocation } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

// fetchCoordssByIP('72.137.62.2', (error, data) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log("Coordinates: ", data);
// });

// fetchISSFlyOverTimes('43.783', '-79.4122', (error, data) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log("ISS: ", data);
// });


nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  outputISS(passTimes);
});

const outputISS = (passTimes) => {
  passTimes.map(circle => {
  
    let time = new Date((circle.risetime) * 1000).toISOString().slice(0, 19).replace('T', ' ');
    console.log(`Next pass at: ${time} for ${circle.duration} seconds!`);
  })
};