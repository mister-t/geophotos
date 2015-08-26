var config = {
  instagram_redirect_uri: process.env.IG_REDIRECT_FULL_URI,
  instagram_redirect_partial_uri: process.env.IG_REDIRECT_PARTIAL_URI,
  instagram_client_id: process.env.IG_CLIENT_ID,
  instagram_client_secret: process.env.IG_SECRET,

  params: {
    title							: 'Instagram Photo Gallery',
    isTesting					: process.env.NODE_ENV !== 'production',
    isProduction			: process.env.IS_PRODUCTION || false,
    appDir						: process.env.APP_DIR || '/js/app/config',
    cssDir						: process.env.CSS_DIR || '/css',
    requirejsDir			: process.env.REQUIREJS_DIR || '/js/libs'
  },

  cities: {
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
  }
}
module.exports = config;
