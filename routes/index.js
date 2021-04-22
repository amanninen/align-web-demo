var express = require('express');
const { Pool } = require('pg');
const { DATABASE_URL } = process.env;

var router = express.Router();

const pool = new Pool({
  connectionString: DATABASE_URL,
    ssl: {
    rejectUnauthorized: false
  }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('routing in once again index');

  res.render('locator', {success: false});
});

/* form handling */
router.post('/leadform', async function (req, res, next) {
  console.log('routing on post form with updated code');
  console.log(req.body);
  //const result = await pool.query(`insert into salesforce.lead(firstname, lastname, mobilephone, postalcode, date_of_birth__c, email, company) Values ('${req.body.txtFirstName}', '${req.body.txtLastName}', '${req.body.txtPhoneNumber}', '${req.body.txtZipDC}', '${req.body.txtDOB}', '${req.body.txtEmail}', 'Invisalign')`);
  pool.query(`INSERT INTO salesforce.lead(firstname, lastname, mobilephone, postalcode, date_of_birth__c, email, company) 
        VALUES ($1,$2$,$3,$4,$5,$6,$7)`, ['${req.body.txtFirstName}', '${req.body.txtLastName}', '${req.body.txtPhoneNumber}', '${req.body.txtZipDC}', '${req.body.txtDOB}', '${req.body.txtEmail}', 'Invisalign'], (err, res2) => {
    if (err) {
        console.log("Error - Failed to insert data into leads");
        console.log(err);
    }
  console.log(res2);
  res.render('locator', { success: true });
});

module.exports = router;
