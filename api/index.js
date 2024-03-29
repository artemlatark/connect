const debug = require('debug')('api');
debug('Server starting...');
debug('logging with debug enabled!');

import express from 'express';
import compression from 'compression';
import http from 'http';

import csrf from 'shared/middlewares/csrf';
import errorHandler from 'shared/middlewares/error-handler';
import i18n from 'shared/middlewares/i18n';
import addSecurityMiddleware from 'shared/middlewares/security';
import toobusy from 'shared/middlewares/toobusy';

import router from './routes';
import middlewares from './routes/middlewares';

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3003;

const app = express();
const server = http.createServer(app);

// Trust the now proxy
app.set('trust proxy', true);
app.use(toobusy);

// Security middleware
addSecurityMiddleware(app, { enableNonce: false, enableCSP: false });
if (process.env.NODE_ENV === 'production') {
	app.use(csrf);
}

// All other middlewares
app.use(compression());
app.use(middlewares);

// Locale init
app.use(i18n.init);

router(app);

// Redirect a request to the root path to the main app
app.use('/', (req, res) => {
	res.redirect(process.env.NODE_ENV === 'production' ? 'https://account.keeberink.com' : 'http://localhost:3002');
});

app.use(errorHandler);

server.listen(PORT, err => {
	if (err) return debug('Oops, something went wrong!', err);

	debug(`API running at http://localhost:${PORT}/api`);
});
