module.exports = function () {
var
  _params = {
      title							: 'Instagram Photo Gallery'
    , isTesting					: process.env.NODE_ENV !== 'production'
    , isProduction			: process.env.IS_PRODUCTION || false
    , appDir						: process.env.APP_DIR || '/js/app/config'
    , cssDir						: process.env.CSS_DIR || '/css'
    , requirejsDir			: process.env.REQUIREJS_DIR || '/js/libs'
  };

  return {
    params : _params
  };
}();
