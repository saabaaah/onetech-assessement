
// Starting Server using express
const express = require("express");

console.log("starting ...");

const app = express();

app.use(express.static(__dirname + "/public"));
 
console.log("express imported ...");

app.listen(6973, () => {
  console.log("Listening on port 6973...");
  
});

