const libraryControllers = require('../controllers/libraryControllers');
const express = require('express');
const libraryRouter = express.Router();

libraryRouter.get('/', libraryControllers.redirectToRoot);

libraryRouter.get('/:folderId', libraryControllers.renderFolder);

module.exports = libraryRouter;