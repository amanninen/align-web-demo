var express = require('express');

var pg = require('pg');

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
  console.log('routing again index');

  /*pool.query(`INSERT INTO salesforce.lead(FirstName,LastName,Company)VALUES($1,$2,$3);`, 
            ['Ari-Pekka','Manninen','Invisaling'], (err, res) => {
    if (err) {
        console.log("Error - Failed to insert data into ccLeads");
        console.log(err);
    }
  });*/
  console.log(pool.listenerCount);
  console.log(pool.idleCount);
  console.log(pool.listenerCount);
  
  res.render('locator', {success: false});
});

/* form handling */
router.post('/leadform', async function (req, res, next) {
  console.log('routing on post async form');
  console.log(req.body);
  //const result = await pool.query(`insert into salesforce.lead(firstname, lastname, mobilephone, postalcode, date_of_birth__c, email, company) Values ('${req.body.txtFirstName}', '${req.body.txtLastName}', '${req.body.txtPhoneNumber}', '${req.body.txtZipDC}', '${req.body.txtDOB}', '${req.body.txtEmail}', 'Invisalign');`);
  /*await pool.query(`INSERT INTO salesforce.lead(FirstName,LastName,Company)VALUES($1,$2,$3)`, 
            ['FirstName','LastName','Invisaling'], (err, res) => {
    if (err) {
        console.log("Error - Failed to insert data into Leads");
        console.log(err);
    }
  });
  */
  console.log("what we got:"+result);
  res.render('locator', { success: true });
});

module.exports = router;
