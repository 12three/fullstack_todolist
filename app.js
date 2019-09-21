const express = require('express');
const config = require('./config');
const bodyParser = require('body-parser');
const router = require('./router');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('./libs/mongoose');
const loadUser = require('./middleware/loadUser');

const app = express();

app.set('view engine', 'pug');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());

app.use(session({
    ...config.get('session'),
    ...{
        store: new MongoStore({ mongooseConnection: mongoose.connection })
    }
}));

app.use(loadUser);

app.use(router);

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', { error: err });
});

module.exports = app;