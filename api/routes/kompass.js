var express = require('express');
var router = express.Router();
var db = require('../models/database');



// GET /api/kompass
router.get('/', function (req, res, next) {

  /* TODO:
   * get all kompass-data from the database
   */

  var sql = 'INSERT INTO kompass (id, timestamp, value, session_id) VALUES (NULL, CURRENT_TIMESTAMP, \'' + req.body.value + '\', \'' + req.body.session_id + '\')';
  db.pool.getConnection(function (err, con) {
    if (err) return res.status(400).send("Databse Error");
    else
      con.query(sql, function (err, result) {
        if (err) return res.status(400).send(err);
        else {
          console.log("Data created and added");
          res.send(req.body);
        }
        res.end();
        con.release();
      });
  });
}); 

  // POST /api/kompass/
  router.post('/', function (req, res) {

    /* TODO:
     * create an kompass-value and add to the database
     */
    var sql = 'INSERT INTO kompass (id, timestamp, degree, session_id) VALUES (NULL, CURRENT_TIMESTAMP, \'' + req.body.degree + '\', \'' + req.body.session_id + '\')';
    db.pool.getConnection(function (err, con) {
      if (err) return res.status(400).send("Databse Error");
      else
        con.query(sql, function (err, result) {
          if (err) throw err;
          else {
            console.log("Data created and added");
            res.send(req.body);
          }
          res.end();
          con.release();
        });
    });
  });

  module.exports = router;