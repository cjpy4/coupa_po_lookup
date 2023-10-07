const obj = { firstName: 'Jean-Luc', lastName: 'Picard', age: 59, hobbies: {

} };

let newObj = Object.fromEntries(Object.entries(obj).filter(([value]) => value.includes('Jean-Luc')));

console.log(newObj);
console.log(Object.values(obj));


{
    "data": [
      {
        "id": 664592,
        "created-at": "2023-08-31T14:17:38-05:00",
        "updated-at": "2023-08-31T15:02:40-05:00",
        "description": "USA - 3/4\" EMT Minis",
        "line-num": 1,
        "need-by-date": "2023-09-05T00:00:00-05:00",
        "order-line-id": 636353,
        "quantity": "50.0",
        "receipt-required": null,
        "source-part-num": "",
        "unspsc-code": null,
        "status": null,
        "sub-line-num": null,
        "supp-aux-part-num": "",
        "total": "0.50",
        "confirm-by-hrs": null,
        "order-confirmation-level": "not_applicable",
        "source-type": "Non-Catalog Request",
        "line-type": "RequisitionQuantityLine",
        "supplier-site-id": null,
        "unit-price": "0.01",
        "transmission-method-override": "supplier_default",
        "transmission-emails": null,
        "service-type": null,
        "extra-line-attribute": null,
        "minimum-order-quantity": null,
        "order-increment": null,
        "manufacturer-name": "",
        "manufacturer-part-number": "",
        "easy-form-response-id": null,
        "image-url": null,
        "alternate-status": "not_available",
        "unit-price-in-usd": "0.01",
        "material-cert-required": false,
        "tax-exempt": true,
    },   
      {
        "id": 664593,
        "created-at": "2023-08-31T14:18:18-05:00",
        "updated-at": "2023-08-31T15:02:40-05:00",
        "description": "USA - 1\" IMC Minis",
        "line-num": 2,
        "need-by-date": "2023-09-05T00:00:00-05:00",
        "order-line-id": 636354,
        "quantity": "50.0",
        "receipt-required": null,
        "source-part-num": "",
        "unspsc-code": null,
        "status": null,
        "sub-line-num": null,
        "supp-aux-part-num": "",
        "total": "0.50",
        "confirm-by-hrs": null,
        "order-confirmation-level": "not_applicable",
        "source-type": "Non-Catalog Request",
        "line-type": "RequisitionQuantityLine",
        "supplier-site-id": null,
        "unit-price": "0.01",
        "transmission-method-override": "supplier_default",
        "transmission-emails": null,
        "service-type": null,
        "extra-line-attribute": null,
        "minimum-order-quantity": null,
        "order-increment": null,
        "manufacturer-name": "",
        "manufacturer-part-number": "",
        "easy-form-response-id": null,
        "image-url": null,
        "alternate-status": "not_available",
        "unit-price-in-usd": "0.01",
        "material-cert-required": false,
        "tax-exempt": true
      }
    ]
}