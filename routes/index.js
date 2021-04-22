var express = require('express');
//const { Pool } = require('pg');
const { DATABASE_URL } = process.env;

var router = express.Router();

//const pool = new Pool({
//  connectionString: DATABASE_URL,
//    ssl: {
//    rejectUnauthorized: false
//  }
//});
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

client.query('SELECT firstname,lastname FROM salesforce.lead;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});


/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('routing in index');
  res.render('locator', {success: false});
});

/* form handling */
router.post('/leadform', async function (req, res, next) {
  console.log('routing on post form');
  console.log(req.body);
  const result = await pool.query(`insert into salesforce.lead(firstname, lastname, mobilephone, postalcode, date_of_birth__c, email, company) Values ('${req.body.txtFirstName}', '${req.body.txtLastName}', '${req.body.txtPhoneNumber}', '${req.body.txtZipDC}', '${req.body.txtDOB}', '${req.body.txtEmail}', 'Invisalign')`);
  console.log(result);
  res.render('locator', { success: true });
});

module.exports = router;
