const libraryControllers = require('../controllers/libraryControllers');
const express = require('express');

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const libraryRouter = express.Router();

libraryRouter.get('/', libraryControllers.redirectToRoot);

libraryRouter.get('/:folderId', libraryControllers.renderFolder);

libraryRouter.post('/:folderId/add-subfolder', libraryControllers.createSubfolder);

// Save uploaded_file to local uploads/ folder temporarily
libraryRouter.post('/:folderId/upload', upload.single('uploaded_file'), libraryControllers.uploadFile);

// Update + Delete post requests
libraryRouter.post('/:type/:id/rename', libraryControllers.renameByTypeAndId);
libraryRouter.post('/:type/:id/delete',  libraryControllers.deleteByTypeAndId);

// TODO


module.exports = libraryRouter;