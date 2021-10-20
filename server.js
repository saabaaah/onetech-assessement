
// Starting Server using express
import express from "express";

console.log("starting ...");

const app = express();

app.use(express.static(__dirname + "/public"));
 
console.log("express imported ...");

app.listen(6970, () => {
  console.log("Listening on port 6973...");
  
});

