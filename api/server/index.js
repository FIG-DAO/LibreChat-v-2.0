require('dotenv').config();
const path = require('path');
require('module-alias')({ base: path.resolve(__dirname, '..') });

const cors = require('cors');
const axios = require('axios');
const express = require('express');
const compression = require('compression');
const passport = require('passport');
const mongoSanitize = require('express-mongo-sanitize');
const fs = require('fs');
const cookieParser = require('cookie-parser');

const { jwtLogin, passportLogin } = require('~/strategies');
const { connectDb, indexSync } = require('~/lib/db');
const { isEnabled } = require('~/server/utils');
const { ldapLogin } = require('~/strategies');
const { logger } = require('~/config');

const validateImageRequest = require('./middleware/validateImageRequest');
const errorController = require('./controllers/ErrorController');
const configureSocialLogins = require('./socialLogins');
const AppService = require('./services/AppService');
const staticCache = require('./utils/staticCache');
const noIndex = require('./middleware/noIndex');
const routes = require('./routes');

// ✅ Leo Core routes from /api/Routes/
const feedbackRoute = require('./Routes/feedback'); // 👈

const { PORT, HOST, ALLOW_SOCIAL_LOGIN, DISABLE_COMPRESSION, TRUST_PROXY } = process.env ?? {};
const port = Number(PORT) || 3080;
const host = HOST || 'localhost';
const trusted_proxy = Number(TRUST_PROXY) || 1;

const startServer = async () => {
  if (typeof Bun !== 'undefined') {
    axios.defaults.headers.common['Accept-Encoding'] = 'gzip';
  }

  await connectDb();
  logger.info('✅ Connected to MongoDB');
  await indexSync();

  const app = express();
  app.disable('x-powered-by');
  await AppService(app);

  const indexPath = path.join(app.locals.paths.dist, 'index.html');
  const indexHTML = fs.readFileSync(indexPath, 'utf8');

  app.get('/health', (_req, res) => res.status(200).send('OK'));

  // ⚙️ Middleware
  app.use(noIndex);
  app.use(errorController);
  app.use(express.json({ limit: '3mb' }));
  app.use(mongoSanitize());
  app.use(express.urlencoded({ extended: true, limit: '3mb' }));
  app.use(staticCache(app.locals.paths.dist));
  app.use(staticCache(app.locals.paths.fonts));
  app.use(staticCache(app.locals.paths.assets));
  app.set('trust proxy', trusted_proxy);
  app.use(cors());
  app.use(cookieParser());

  if (!isEnabled(DISABLE_COMPRESSION)) {
    app.use(compression());
  }

  app.use(passport.initialize());
  passport.use(await jwtLogin());
  passport.use(passportLogin());

  if (process.env.LDAP_URL && process.env.LDAP_USER_SEARCH_BASE) {
    passport.use(ldapLogin);
  }

  if (isEnabled(ALLOW_SOCIAL_LOGIN)) {
    configureSocialLogins(app);
  }

  // 🌐 Existing core routes
  app.use('/oauth', routes.oauth);
  app.use('/api/auth', routes.auth);
  app.use('/api/user', routes.user);
  app.use('/api/models', routes.models);
  app.use('/api/agents', routes.agents);
  app.use('/api/files', await routes.files.initialize());
  // ...

  // ✅ Leo Core route
  app.use('/api/feedback', feedbackRoute); // 👈

  // 📄 fallback
  app.use((req, res) => {
    res.set({
      'Cache-Control': process.env.INDEX_CACHE_CONTROL || 'no-cache, no-store, must-revalidate',
      Pragma: process.env.INDEX_PRAGMA || 'no-cache',
      Expires: process.env.INDEX_EXPIRES || '0',
    });

    const lang = req.cookies.lang || req.headers['accept-language']?.split(',')[0] || 'en-US';
    const saneLang = lang.replace(/"/g, '&quot;');
    const updatedIndexHtml = indexHTML.replace(/lang="en-US"/g, `lang="${saneLang}"`);
    res.type('html');
    res.send(updatedIndexHtml);
  });

  app.listen(port, host, () => {
    logger.info(`🚀 Server listening at http://${host === '0.0.0.0' ? 'localhost' : host}:${port}`);
  });
};

startServer();
