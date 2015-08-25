var
    express = require('express')
  , util   = require('util')
  , router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', util.params);
});

module.exports = router;
