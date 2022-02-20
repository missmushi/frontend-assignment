const express = require("express");
const axios = require("axios");
const cors = require("cors");

// require("dotenv").config();
const app = express();

app.use(cors());

app.get("/api/trips", async function (req, res) {
  var trips, responseData;
  var query =
    typeof req.query.keyword !== "undefined"
      ? JSON.parse(req.query.keyword)
      : "";
  console.log(`API Gateway Got Request with ${query}`);

  await axios
    .get('http://localhost:3000/trips')
    .then((res) => {
      trips = res.data;
    })
    .catch((err) => {
      console.error("JSON-Server:" + err);
    });

  responseData = trips.filter(
    (trip) =>
      trip.title.includes(query) ||
      trip.description.includes(query) ||
      trip.tags.includes(query)
  );

  console.log(responseData)

  res.status(200).json({ trips: responseData });
});

app.listen(process.env.PORT || 9000, function () {
  console.log(
    'API Gateway Server Started at Port 9000'
  );
});
// const express = require('express');
// const app = express();
// const trips = require('./json-server/db.json');

// app.get('/api/trips', function(req, res){
//   var response = [];

//   if( typeof req.query.keyword != 'undefined' ){
//     response = trips.filter(function(trip){
//       if(trip.keyword === true){
//         return trip;
//       }
//     });
//   } else {
//     response = trips;
//   }

//   res.json(response);
// });

// app.listen(9000, function(){
//   console.log('Example app listening on port 9000!')
// });