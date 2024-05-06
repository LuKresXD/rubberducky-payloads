const sequelize = require('../lib/db');
const Download = require('../models/Download');

async function initializeDatabase() {
    try {
        await sequelize.sync({ force: true });
        console.log('Database and tables created!');

        // Optionally seed initial data
        await Download.create({ scriptName: 'WinRM', count: 0 });
        await Download.create({ scriptName: 'E-Z.Bio', count: 0 });
        await Download.create({ scriptName: 'E-Z Tickets', count: 0 });

        console.log('Initial data seeded!');
    } catch (error) {
        console.error('Failed to initialize database:', error);
    }
}

initializeDatabase();
