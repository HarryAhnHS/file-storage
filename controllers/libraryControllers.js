const { root } = require('postcss');
const db = require('../db/queries');

module.exports = {
    redirectToRoot: async (req, res) => {
        const rootFolder = await db.getRootFolder(req.user.id);
        res.redirect(`/library/${rootFolder.id}`);
    },
    renderFolder: async (req, res) => {
        const userId = req.user.id;
        const folderId = req.params.folderId;
        const folder = await db.getFolder(userId, folderId);
        console.log("populating with folder: ", folder);
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