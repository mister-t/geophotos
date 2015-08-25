module.exports = function () {
var
  _cities = {
    'sf' : {
      'lat': 37.787468, 'lng': -122.406746
    },
    'la' : {
      'lat': 34.043235, 'lng': -118.267508
    },
    'nyc' : {
      'lat': 40.773477, 'lng': -73.956127
    },
    'lv' : {
      'lat': 36.115597, 'lng': -115.172902
    }
  },
  _params = {
      title							: 'Instagram Photo Gallery'
    , isTesting					: process.env.NODE_ENV !== 'production'
    , isProduction			: process.env.IS_PRODUCTION || false
    , appDir						: process.env.APP_DIR || '/js/app/config'
    , cssDir						: process.env.CSS_DIR || '/css'
    , requirejsDir			: process.env.REQUIREJS_DIR || '/js/libs'
  };

  return {
    params : _params,
    cities : _cities
  };
}();
