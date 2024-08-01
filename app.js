//Module
const express = require('express');
const xmlparser = require('express-xml-bodyparser');
const cors = require('cors')
const etaxApi = require('./callEtax.js');
const connectDB = require("./db.js");
const auth = require('./Auth/Auth.js');
const validate = require('./middleware/Auth.js');


//Application setting
const app = express ();
app.use(express.json());
app.use(xmlparser({explicitArray:false, normalizeTags:false}));
app.use(cors());
const PORT = process.env.PORT || 3000;
connectDB.connectDB();

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
app.post("/upload", async function (request, response) {
   if(validate.validate(request)){
    json_data = request.body['root'];
    resCode =  await etaxApi.importToEtax(json_data);
    console.log(resCode);
    response.sendStatus(resCode);
   }
   else{
      response.sendStatus(401);
   }
});
app.post("/getToken", async function (request, response){
   auth.login(request, response);
});