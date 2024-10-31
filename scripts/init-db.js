const sequelize = require('../lib/db');
const Download = require('../models/Download');

async function initializeDatabase() {
    try {
        await sequelize.sync({ force: true });
        console.log('Database and tables created!');

        // Function to generate a random number between min and max (inclusive)
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

        // Create initial records with random download counts
        await Download.create({ scriptName: 'WinRM', count: getRandomInt(50, 200) });
        await Download.create({ scriptName: 'IP grabber', count: getRandomInt(40, 180) });
        await Download.create({ scriptName: 'Password Stealer', count: getRandomInt(60, 220) });
        await Download.create({ scriptName: 'Tdata MacOS stealer', count: getRandomInt(30, 150) });
        await Download.create({ scriptName: 'Tdata AppStore stealer', count: getRandomInt(25, 140) });
        await Download.create({ scriptName: 'Tdata Windows stealer', count: getRandomInt(35, 170) });
        await Download.create({ scriptName: 'Windows Key Grabber', count: getRandomInt(35, 170) });

        console.log('Initial data seeded with random download counts!');
    } catch (error) {
        console.error('Failed to initialize database:', error);
    }
}

initializeDatabase();