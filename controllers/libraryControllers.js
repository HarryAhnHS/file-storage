const { root } = require('postcss');
const db = require('../db/queries');

module.exports = {
    redirectToRoot: async (req, res) => {
        const rootFolder = await db.getRootFolder(req.user.id);
        res.redirect(`/library/${rootFolder.id}`);
    },
    renderFolder: async (req, res) => {
        const folderId = req.params.id;
        const folder = await db.getFolderById(folderId);
        res.render('library', {
            folder: folder
        })
    }
}