var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  var params = {
    title								: 'Student Information System'
    , isTesting					: process.env.NODE_ENV !== 'production'
    , isProduction			: process.env.IS_PRODUCTION || false
    , appDir						: process.env.APP_DIR || '/js/app/config'
    , cssDir						: process.env.CSS_DIR || '/css'
    , requirejsDir			: process.env.REQUIREJS_DIR || '/js/libs'

  };

  res.render('index', params);
});

module.exports = router;
