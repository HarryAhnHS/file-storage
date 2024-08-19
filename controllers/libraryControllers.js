const { root } = require('postcss');
const db = require('../db/queries');

module.exports = {
    redirectToRoot: async (req, res) => {
        console.log('testing', req.user.id);
        const rootFolder = await db.getRootFolder(req.user.id);
        res.redirect(`/library/${rootFolder.id}`);
    },
    renderFolder: async (req, res) => {
        const userId = req.user.id;
        const folderId = req.params.id;
        const folder = await db.getFolder(userId, folderId);
        res.render('library', {
            folder: folder
        })
    },
    createSubfolder: async (req, res) => {
        const userId = req.user.id;
        const parentId = req.params.folderId;

        await db.addSubfolder(userId, parentId);

        res.redirect(`/library/${parentId}`);
    }
}