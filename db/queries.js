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
    getFolderById: async (folderId) => {
        try {
            const folder = await prisma.folder.findFirst({
                where: {
                  folderId: folderId,      // Replace userId with the actual user's ID
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
    }
};
