const { PrismaClient } = require("@prisma/client");

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
            console.error('Error finding user:', error)
            throw error
        }
    }
};
