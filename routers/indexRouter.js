const indexControllers = require('../controllers/indexControllers');
const express = require('express');
const indexRouter = express.Router();

indexRouter.get('/', (req, res) => {
    res.send(<div>Hi you are logged in</div>)
})