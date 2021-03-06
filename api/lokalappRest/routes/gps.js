var express = require('express');
var router = express.Router();
var db = require('../models/database');


// GET /api/gps/
router.get('/', function (req, res, next) {

  /* TODO:
   * get all gps-data from the database
   */

  db.pool.getConnection(function (err, con) {
    if (err) return res.status(400).send("Database Error");
    else
      con.query("SELECT * FROM gps", function (err, result, fields) {
        if (err) throw err;
        else res.status(200).send(result);
        res.end();
        con.release();
      });
  });
});

// POST /api/gps/
router.post('/', function (req, res) {

  /* TODO:
   * create an gps-sensor-data and add it to the database
   */
  var temp;
  if (req.body instanceof Array)
    temp = req.body[0];
  else
    temp = req.body;

  var sql = 'INSERT INTO gps (id, timestamp, latitude, longitude, altitude, session_id) VALUES (NULL, \'' + req.body.timestamp + '\', \'' + temp.latitude + '\', \'' + temp.longitude + '\', \'' + temp.altitude + '\', \'' + temp.session_id + '\')';

  db.pool.getConnection(function (err, con) {
    if (err) return res.status(400).send("Database Error");
    else
      con.query(sql, function (err, result) {
        if (err) res.status(400).send(err);
        else {
          console.log("Data created and added");
          res.send(req.body);
        }
        res.end();
        con.release();
      });
  });

});

// Delete /api/gps/clear
router.delete('/clear', function (req, res) {

  var sql = 'DELETE FROM gps';

  db.pool.getConnection(function (err, con) {
    if (err) return res.status(400).send("Database Error");
    else
      con.query(sql, function (err, result) {
        if (err) throw err;
        else {
          console.log("Data was deleted");
          res.send('Got a DELETE request at gps');
        }
        res.end();
        con.release();
      });
  });
});

module.exports = router;