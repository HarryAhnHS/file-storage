const db = require('../db/queries');
const cloudinary = require('../utils/cloudinary.config');

const axios = require('axios')

module.exports = {
    redirectToRoot: async (req, res) => {
        const rootFolder = await db.getRootFolder(req.user.id);
        res.redirect(`/library/${rootFolder.id}`);
    },
    renderFolder: async (req, res) => {
        const userId = req.user.id;
        const folderId = req.params.folderId;
        const folder = await db.getFolder(userId, folderId);
        console.log("Rendering with folder:", folder);
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



    uploadFile: async (req, res) => {
        console.log('uploaded file to uploads:', req.file); // Log the file to see what is being received

        const folderId = req.params.folderId;
        // Multer metadata of upload
        const { originalname, size, path } = req.file;

        try {
            // Upload file to Cloudinary
            const result = await cloudinary.uploader.upload(path, {
                resource_type: 'auto'
            });
    
            // Add file to database
            await db.addFile(originalname, result.secure_url, size, folderId);
    
            // Redirect back to the referring page
            const redirectUrl = req.get('Referer') || `/`;
            res.redirect(redirectUrl);
        } catch (error) {
            console.error('Upload failed:', error);
            throw error;
        }
    },
    renderFile: async (req, res) => {
        const fileId = req.params.fileId;
        const file = await db.getFile(fileId);

        res.render('file', {
            file: file
        });
    },
    downloadFile: async (req, res) => {
        const fileToDownload = req.params.fileId;
        const file = await db.getFile(fileToDownload);

        try {
            // Use Axios to stream the file from Cloudinary
            const response = await axios.get(file.path, { responseType: 'stream' });
        
            // Set headers for file download
            res.setHeader('Content-Disposition', `attachment; filename="${file.name}"`);
            res.setHeader('Content-Type', response.headers['content-type']);
        
            // Stream the file to the response
            response.data.pipe(res);
          } catch (error) {
            console.error('Error downloading file:', error);
            res.redirect(`/library/${file.folderId}`);
          }
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