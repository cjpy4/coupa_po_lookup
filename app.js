var express = require("express");
const axios = require("axios").default;

var app = express();

let id = 664592;

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

app.listen(3000, () => {
 console.log("Server running on port 3000");
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


async function getToken() {
try {
    const res = await axios.post('https://aldridge.coupahost.com/oauth2/token', {
        client_id: `${client_id}`,
        client_secret: `${client_secret}`,
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
        let requisition_items = res.data[0]['requisition-header']['requisition-lines'];
        let table = {requisition_items}
       // console.log(table);
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
