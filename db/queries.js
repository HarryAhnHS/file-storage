const { PrismaClient } = require("@prisma/client");
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

module.exports = {
    findUser: async (colName, query) => {
        try {
            const whereClause = { [colName]: query };
            const user = await prisma.user.findUnique({
                where: whereClause
            })

            return user;
        } catch (error) {
            console.error('Error finding user:', error);
            throw error;
        }
    },
    addUser: async (username, password) => {
        try {
            const hashedPassword = await new Promise((resolve, reject) => {
                bcrypt.hash(password, 10, (err, hashedPassword) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(hashedPassword);
                });
            });
            const user = await prisma.user.create({
                data: {
                    username: username,
                    password: hashedPassword,
                    folders: {
                        create: {
                            name: `@${username}'s Library`,
                        }
                    }
                }
            })

            return user;
        }
        catch(error) {
            console.error('Error adding user', error);
            throw error;
        }
    },
    getRootFolder: async (userId) => {
        try {
            const user = await prisma.folder.findFirst({
                where: {
                  userId: userId,
                  parentId: null
                },
                include: {
                  subfolders: true,
                  files: true
                }
            });
            return user;
        }
        catch(error) {
            console.error('Error getting root', error);
            throw error;
        }
    },
    getFolder: async (userId, folderId) => {
        try {
            const folder = await prisma.folder.findFirst({
                where: {
                    id: folderId,
                    userId: userId,
                },
                include: {
                  subfolders: true,
                  files: true
                }
            });
            return folder;
        }
        catch(error) {
            console.error('Error getting folder', error);
            throw error;
        }
    },
    addSubfolder: async (userId, parentId) => {
        try {
            console.log('help',userId, parentId)
            const newSubfolder = await prisma.folder.create({
                data: {
                    name: "New Folder",   // Name of the new subfolder
                    userId: userId,           // User ID to associate with the new subfolder
                    parentId: parentId  // Set parentId to link to the parent folder
                }
            });
            return newSubfolder;
        }
        catch(error) {
            console.error('Error creating subfolder', error);
            throw error;
        }
    }
};
