//Module
const express = require('express');
const convert = require('./xml_convert')
const xmlparser = require('express-xml-bodyparser');
const app = express ();

//Application setting
app.use(express.json());
app.use(xmlparser({explicitArray:false}));

const PORT = process.env.PORT || 3000;

//API
app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
  });
app.get("/status", (request, response) => {
   const status = {
      "Status": "Running"
   };
   response.send(status);
});
app.post("/upload", function(request, response){
    response.send(request.body)
});