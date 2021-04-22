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
  console.log(pool);
  pool.query(`SELECT * FROM salesforce.lead;`, (err, res) => {
    if (err) {
        console.log("Error - Failed to select all from leads");
        console.log(err);
    }
    else{
        console.log(res.rows);
    }
  }); 
  
  res.render('locator', {success: false});
});

/* form handling */
router.post('/leadform', async function (req, res, next) {
  console.log('routing on post form f');
  console.log(req.body);
  const result = await pool.query(`insert into salesforce.lead(firstname, lastname, mobilephone, postalcode, date_of_birth__c, email, company) Values ('${req.body.txtFirstName}', '${req.body.txtLastName}', '${req.body.txtPhoneNumber}', '${req.body.txtZipDC}', '${req.body.txtDOB}', '${req.body.txtEmail}', 'Invisalign')`);
  console.log(result);
  res.render('locator', { success: true });
});

module.exports = router;
