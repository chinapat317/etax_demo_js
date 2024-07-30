//Module
const express = require('express');
const xmlparser = require('express-xml-bodyparser');
const etaxApi = require('./callEtax.js');

//Application setting
const app = express ();
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
app.post("/upload", async function(request, response){
    json_data = request.body['root'];
    resCode =  await etaxApi.importToEtax(json_data);
    console.log(resCode);
    response.sendStatus(resCode);
});