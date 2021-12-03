const { nextISSTimesForMyLocation } = require('./iss_promised');

nextISSTimesForMyLocation()
  .then((passTimes) => {
    // console.log(passTimes.response);
    outputISS(passTimes);
  })
  .catch((error) => {
    // console.log("It didn't work: ", error.message);
  });

const outputISS = (passTimes) => {
  
    let response = passTimes.response;
    response.forEach(circle => {
  
    let time = new Date((circle.risetime) * 1000).toISOString().slice(0, 19).replace('T', ' ');
    console.log(`Next pass at: ${time} for ${circle.duration} seconds!`);
  })
};
