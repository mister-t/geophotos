var
  express       = require('express'),
  instaApi      = require('instagram-node').instagram(),
  Bluebird      = require('bluebird'),
  router        = express.Router(),
  config        = require('./config');

Bluebird.promisifyAll(instaApi);

var getGrams = function (medias) {
  var results = [];
  medias.forEach(function (m) {
    results.push({
      photoId: m.id,
      imgSrc: m.images.thumbnail.url,
      caption: m.caption && m.caption.text ? m.caption.text : ''
    });
  });

  return results;
};

var handleAuth = function (req, res) {
  instaApi.authorize_userAsync(req.query.code, config.instagram_redirect_uri)
  .then(function (result) {
    res.cookie('instaToken',result.access_token, { maxAge: 900000, httpOnly: true });
    res.redirect('/');
  })
  .catch(function (errors) {
    console.log(errors);
  });
};

/* check to see if instagram token exists.
* if yes, display the index page.
* if no, log in first, then display the index page*/
router.get('/', function (req, res) {
  if (req.cookies.instaToken) {
    console.log('instagram token cookie deteced');
    instaApi.use({ access_token: req.cookies.instaToken });
    return instaApi.media_searchAsync(config.cities.sf.lat, config.cities.sf.lng)
    .spread(function (medias, pagination, remaining, limit) {
      return medias;
    })
    .then(function (medias) {
      console.log(getGrams(medias));
      res.render('index', config.params);
    })
    .catch(function (errors) {
      console.log(errors);
    });
  } else {
    console.log('instagram token cookie not deteced');
    //res.render('index', config.params);
    res.redirect('/authorize-user');
  }
});

/* Redirect user to Instagram for authentication */
router.get('/authorize-user', function (req, res) {
  instaApi.use({
    client_id: config.instagram_client_id,
    client_secret: config.instagram_client_secret
  });
  res.redirect(instaApi.get_authorization_url(config.instagram_redirect_uri));
});

/* Set cookie once Instagram sends access code */
router.get('/handleauth', handleAuth);
router.get(config.instagram_redirect_partial_uri, handleAuth);

/* Search around a specific city for new grams */
router.get('/instasearch/:city', function (req, res) {
  if (req.cookies.instaToken) {
    console.log('instagram token cookie deteced');
    instaApi.use({ access_token: req.cookies.instaToken });
    return instaApi.media_searchAsync(config.cities.sf.lat, config.cities.sf.lng)
    .spread(function (medias, pagination, remaining, limit) {
      return medias;
    })
    .then(function (medias) {
      var grams = getGrams(medias);
      console.log(grams);
      res.json(grams);
    })
    .catch(function (errors) {
      console.log(errors);
    });
  } else {
    console.log('instagram token cookie not deteced');
    res.redirect('/authorize-user');
  }
});

router.get('/photos/:city', function (req, res) {
  if (req.cookies.instaToken) {
    console.log('instagram token cookie deteced');
    instaApi.use({ access_token: req.cookies.instaToken });
    return instaApi.media_searchAsync(config.cities.sf.lat, config.cities.sf.lng)
    .spread(function (medias, pagination, remaining, limit) {
      return medias;
    })
    .then(function (medias) {
      var grams = getGrams(medias);
      console.log(grams);
      res.json(grams);
    })
    .catch(function (errors) {
      console.log(errors);
    });
  } else {
    console.log('instagram token cookie not deteced');
    res.redirect('/authorize-user');
  }
});
module.exports = router;
