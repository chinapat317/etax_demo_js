const axios = require('axios');
const { STATUS_CODES } = require('http');

const headers = {
    "Content-Type": "application/json"
};

async function importToEtax(json_data){
    var status;
    await axios.post(
        "https://nawani-uat.digibiz.cloud/document-transaction-service/ws/api/trandocument/save",
        json_data
    ).then((res) => {
        console.log(res.data);
        status = res.status;
      }).catch((error) => {
        if (error.code === "ERR_CANCELED" && abortSignal.aborted) {
            console.log("Request timed out");
        }
        status = error.response.status;
      });
      return status;
}
module.exports = {importToEtax};