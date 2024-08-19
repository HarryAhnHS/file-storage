const indexControllers = require('../controllers/indexControllers');
const express = require('express');
const indexRouter = express.Router();

indexRouter.get("/",indexControllers.indexGet);

indexRouter.get("/sign-up", indexControllers.signUpGet);
indexRouter.post("/sign-up", indexControllers.signUpPost);

// Login
indexRouter.get('/log-in', indexControllers.logInGet);
indexRouter.post("/log-in", indexControllers.logInPost);

// Logout
indexRouter.get("/log-out", indexControllers.logOutGet);


module.exports = indexRouter;