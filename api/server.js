const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const restrict = require('./middleware/restricted.js');

const authRouter = require('./auth/auth-router.js');
const jokesRouter = require('./jokes/jokes-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/jokes', restrict, jokesRouter); // only logged-in users should have access!

// handles all the errors
server.use((err, req, res, next) => {
	res.status(err.status || 500).send({
		custom: 'Strange things are afoot at the circle K',
		message: err.message,
		stack: err.stack
	});
});

module.exports = server;