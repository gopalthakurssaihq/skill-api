const express = require('express');
const app = express();
const cors = require('cors');
const session = require('express-session');
const json2xls = require('json2xls');
const bodyParser = require('body-parser');
const fs = require('fs');
const passport = require('passport');
const SamlStrategy = require('passport-saml').Strategy;
const env = process.env.NODE_ENV || 'development';
const siteConfig = require(`${__dirname}/config/config.json`)[env];
const path = require('path');
const JwtService = require('./utils/jwt');

const dotenv = require('dotenv');
dotenv.config();

app.options('*', cors());
// Enable CORS
app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
    exposedHeaders: ['Content-Length']
  })
);

// Logger
const { requestLogger } = require('./support/logger');
require('express-async-errors');
const { errorHandler, badJsonHandler, notFoundHandler } = require('./middlewares');
const User = require('./db/User');

// Body Parser
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

app.use(requestLogger);
app.use(express.json());
app.use(badJsonHandler);

// Session Configuration
app.use(
  session({
    name: process.env.APP_NAME,
    secret: process.env.SESSION_KEY,
    resave: process.env.SESSION_RESAVE === 'true',
    saveUninitialized: process.env.SESSION_SAVE_UNINITIALIZED === 'true',
    cookie: {
      secure: process.env.COOKIE_SECURE === 'true', // Works with HTTPS
      maxAge: 3600000 // 1 hour
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  req.setTimeout(600000); // 10 minutes timeout
  next();
});

// Example Controller
const exampleController = async (req) => {
  try {
    return { statusCode: 200, body: 'Success' };
  } catch (error) {
    return { statusCode: 500, body: 'Internal Server Error' };
  }
};

// JSON to XLS Middleware
app.use(json2xls.middleware);

// Logging Middleware
app.use((req, res, next) => {
  console.log('Middleware status code:', res.statusCode);
  next();
});

// Test Route
app.get('/', (req, res) => {
  exampleController(req)
    .then((response) => {
      console.log('Response:', response);
      if (!response.statusCode) {
        console.error('Undefined status code detected');
        res.status(500).send('Internal Server Error');
      } else {
        res.status(response.statusCode).send(response.body);
      }
    })
    .catch((error) => {
      console.log('Error:', error);
      res.status(500).send(error.message);
    });
});

// =======================
//  OKTA SAML INTEGRATION
// =======================

// Configure SAML Strategy
passport.use(
  new SamlStrategy(
    {
      entryPoint: process.env.OKTA_ENTRY_POINT, // Okta SAML Login URL
      issuer: process.env.OKTA_ISSUER, // Okta Entity ID
      callbackUrl: process.env.OKTA_CALLBACK_URL, // Callback URL after login
      cert: fs.readFileSync(path.join(__dirname, 'config', 'okta.cert'), 'utf-8'), // Load Okta Public Cert
      logoutUrl: process.env.OKTA_LOGOUT_URL // Optional Logout URL
    },
    (profile, done) => {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// SAML Login Route
app.get('/auth/saml', passport.authenticate('saml', { session: false }));

// SAML Callback Route (Handles SAML Response)
app.post('/login/callback', passport.authenticate('saml', { session: false }), async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  let resUser = await User.findOne({ email: req.user.nameID });

  if (!resUser) {
    resUser = new User({
      email: req.user.nameID,
      firstName: req.user.nameID,
      lastName: req.user.nameID,
      password: 'abc!@#2024',
    });
    console.log("test ", resUser);
    resUser = await resUser.save();
  }

  // Prepare JWT payload
  const payload = {
    id: resUser._id,
    email: resUser.email,
    role: resUser.role,
    firstName: resUser.firstName,
    lastName: resUser.lastName,
    employeeNumber: resUser.employeeNumber,
    displayName: resUser.displayName
  };
  const accessToken = await JwtService.generateJWT({ payload });
  res.redirect(`http://localhost:3002/login?token=${accessToken}`);
});

// SAML Logout Route
app.get('/auth/logout', (req, res) => {
  req.logout(() => {
    res.redirect(process.env.OKTA_LOGOUT_URL);
  });
});

// =======================
//  EXISTING ROUTES
// =======================

// Load routes
require('./loaders/routes')(app);

// Load and validate env variables
require('./loaders/config');

// 404 Not Found Handler
app.use(notFoundHandler);

// Global Error Handler
app.use(errorHandler);

// Global Variables
app.locals.moment = require('moment');
app.locals.env = env;
app.locals.siteConfig = siteConfig;
app.locals.globalRoot = __dirname;

module.exports = app;
