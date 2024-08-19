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
        res.render('library', {
            folder: folder
        })
    },
    createSubfolder: async (req, res) => {
        const userId = req.user.id;
        const parentId = req.params.folderId;

        await db.addSubfolder(userId, parentId);

        res.redirect(`/library/${parentId}`);
    },
    renameByTypeAndId: async (req, res) => {
        const type = req.params.type;
        const idToUpdate = req.params.id;

        const { name } = req.body;

        await db.renameEntry(type, idToUpdate, name);

        // Redirect back to the referring page
        const redirectUrl = req.get('Referer') || `/`;
        res.redirect(redirectUrl);
    },
    deleteByTypeAndId: async (req, res) => {
        const type = req.params.type;
        const idToUpdate = req.params.id;

        await db.deleteEntry(type, idToUpdate);

        // Redirect back to the referring page
        const redirectUrl = req.get('Referer') || `/`;
        res.redirect(redirectUrl);
    }
}