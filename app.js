var express = require("express");
const axios = require("axios").default;
const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');

const client = new SecretManagerServiceClient();
var app = express();
const path = require('path');
const fs = require('fs');
let id = 664592;

const client_id_var = "f8ba0b1ba25dbf462e86bd5242af1395"
//const client_secret = 

// const client_id = "f8ba0b1ba25dbf462e86bd5242af1395"
const client_secret_var = "7d89686d38682093023a6dc267195dd02e1fba7a611f392727fb9f81b0cbfa6a"

let testObj = {
  "orders": [
  {
    "ID": 1,
    "TextValue": "Order1",
    "DecimalValue": 1.10,
    "DateTime": "1/1/2016 1:01:01 AM",
    "PhoneValue": "111 111 1111",
    "EmailValue": "email1@appsheet.com"
  },
  {
    "ID": 2,
    "TextValue": "Order2",
    "DecimalValue": 1.11,
    "DateTime": "2/1/2016 1:01:01 AM",
    "PhoneValue": "111 112 1111",
    "EmailValue": "email2@appsheet.com"
  }
  ]
}

app.use(express.static('public'))

app.listen(8080, () => {
 console.log("Server running on port 8080");
});

app.get("/", async (req, res, next ) => {
  // const options = {
    // root: path.join(__dirname, 'public')
  // };
  let file = fs.readFile(path.join(__dirname,'public','apispec.yml'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const modifiedSpec = data.replace(/SERVER_URL/g, req.protocol+'://'+req.get('host'));
    
    res.set('Content-Type', 'text/plain;charset=UTF-8');
    
    res.send(modifiedSpec);
  });
  // res.sendFile("apispec.yml", options);
});

app.get("/requisition_items", async (req, res, next) => {
    let response = await handleResponse()
    res.send(response);
});

app.get(`/requisition_items/id`, async (req, res, next) => {
    let response = await handleResponse()
    res.send(response);
});

app.get("/orders", async (req, res, next) => {
    let response = await handleResponse()
    res.send(testObj);
});

let secret = 'projects/aldridge-coupa-appsheet/secrets/client_secret';
let request = {
  name: secret,
};
async function getToken() {
try {
    //const access_response = await client.getSecret(request);
    //console.log(access_response);
    const res = await axios.post('https://aldridge.coupahost.com/oauth2/token', {
        client_id: `${client_id_var}`,
        client_secret: `${client_secret_var}`,
        scope: 'core.purchase_order.read core.purchase_order.write core.user.read core.user.write',
        grant_type: 'client_credentials'
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }) 
    console.log('Response Code: '+res.status);
    return res.data.access_token;
} catch(error) {
    console.error('Error: ', error);
}
}

async function getPOItems(po_num, bearer_token) {
    try {
        const res = await axios.get(`https://aldridge.coupahost.com/api/purchase_orders?po-number=${po_num}`,  {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${bearer_token}`
            }
        }) 
        console.log('Response Code: '+res.status);
        let requisitionItems = res.data[0]['requisition-header']['requisition-lines'];
        let filteredItems = [];
        requisitionItems.forEach(item => {
          let newItem = Object.fromEntries(
            Object.entries(item).slice(0,8)
          );
          filteredItems.push(newItem);
        });
        let table = JSON.stringify({filteredItems});
        console.log(table);
        return table
    } catch(error) {
        console.error('Error: ', error);
    }
    }

async function handleResponse() {
    try {
        const token = await getToken();
      return await getPOItems(66208781, token);
    } catch (error) {
        console.error("Error Msg: "+error);
    }
}
