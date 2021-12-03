const { nextISSTimesForMyLocation } = require('./iss_promised');

nextISSTimesForMyLocation()
  .then((passTimes) => {
    console.log(passTimes);
  });

// const outputISS = (passTimes) => {
//   passTimes.map(circle => {
  
//     let time = new Date((circle.risetime) * 1000).toISOString().slice(0, 19).replace('T', ' ');
//     console.log(`Next pass at: ${time} for ${circle.duration} seconds!`);
//   })
// };