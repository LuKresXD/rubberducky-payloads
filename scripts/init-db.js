const sequelize = require('../lib/db');
const Download = require('../models/Download');

async function initializeDatabase() {
    try {
        await sequelize.sync({ force: true });
        console.log('Database and tables created!');

        await Download.create({ scriptName: 'WinRM', count: 0 });
        await Download.create({ scriptName: 'IP grabber', count: 0 });
        await Download.create({ scriptName: 'Password Stealer', count: 0 });
        await Download.create({ scriptName: 'Tdata MacOS stealer', count: 0 });
        await Download.create({ scriptName: 'Tdata AppStore stealer', count: 0 });
        await Download.create({ scriptName: 'Tdata Windows stealer', count: 0 });

        console.log('Initial data seeded!');
    } catch (error) {
        console.error('Failed to initialize database:', error);
    }
}

initializeDatabase();
