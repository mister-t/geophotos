var
  express       = require('express')
, path          = require('path')
, favicon       = require('serve-favicon')
, logger        = require('morgan')
, cookieParser  = require('cookie-parser')
, bodyParser    = require('body-parser')
, ig            = require('instagram-node').instagram()
, IG_CLIENT_ID  = process.env.IG_CLIENT_ID
, IG_SECRET     = process.env.IG_SECRET
, IG_RE_FULL_URL= process.env.IG_REDIRECT_FULL_URL
, IG_RE_PART_URL= process.env.IG_REDIRECT_PARTIAL_URL
;

var routes = require('./routes/index');

var app = express();

//Instagram-node settings
ig.use({
  client_id: IG_CLIENT_ID,
  client_secret: IG_SECRET
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

exports.authorize_user = function(req, res) {
  res.redirect(ig.get_authorization_url(IG_RE_FULL_URL, {}));
};

exports.handleauth = function(req, res) {
  ig.authorize_user(req.query.code, IG_RE_FULL_URL, function(err, result) {
    res.redirect('/photos');
    //if (err) {
      //console.log(err.body);
      ////res.send("Didn't work");
    //} else {
      //console.log('Yay! Access token is ' + result.access_token);
      ////res.send('You made it!!');
    //}
  });
};

// This is where you would initially send users to authorize
app.get('/', exports.authorize_user);
// This is your redirect URI
app.get(IG_RE_PART_URL, exports.handleauth); //partial URL is everything without the host name

//app.use('/', routes);
app.use('/photos', routes);

app.use('/photos/sf', routes);
app.use('/photos/nyc', routes);
app.use('/photos/la', routes);
app.use('/photos/lv', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
