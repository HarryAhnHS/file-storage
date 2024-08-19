const libraryControllers = require('../controllers/libraryControllers');
const express = require('express');
const libraryRouter = express.Router();

libraryRouter.get('/', libraryControllers.redirectToRoot);

libraryRouter.get('/:folderId', libraryControllers.renderFolder);

libraryRouter.post('/:folderId/add-subfolder', libraryControllers.createSubfolder);

// Update + Delete post requests
libraryRouter.post('/:type/:id/rename', libraryControllers.renameByTypeAndId);
libraryRouter.post('/:type/:id/delete',  libraryControllers.deleteByTypeAndId);

// TODO


module.exports = libraryRouter;