const sequelize = require('../lib/db');
const Download = require('../models/Download');

async function initializeDatabase() {
    try {
        await sequelize.sync({ force: true });
        console.log('Database and tables created!');

        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

        // Standardized download count ranges
        const ranges = {
            popular: { min: 150, max: 300 },      // Popular tools
            common: { min: 80, max: 200 },        // Commonly used tools
            specialized: { min: 40, max: 120 }    // More specialized tools
        };

        // Create initial records with categorized random download counts
        const initialPayloads = [
            // Popular security tools
            { scriptName: 'WinRM', count: getRandomInt(ranges.popular.min, ranges.popular.max) },
            { scriptName: 'IP grabber', count: getRandomInt(ranges.popular.min, ranges.popular.max) },
            { scriptName: 'Password Stealer', count: getRandomInt(ranges.popular.min, ranges.popular.max) },

            // Common system tools
            { scriptName: 'Windows Key Grabber', count: getRandomInt(ranges.common.min, ranges.common.max) },
            { scriptName: 'Windows Defender Disabler', count: getRandomInt(ranges.common.min, ranges.common.max) },
            { scriptName: 'Firefox Cookie Stealer', count: getRandomInt(ranges.common.min, ranges.common.max) },
            { scriptName: 'SSH Key Grabber', count: getRandomInt(ranges.common.min, ranges.common.max) },

            // Specialized Telegram tools
            { scriptName: 'Tdata MacOS stealer', count: getRandomInt(ranges.specialized.min, ranges.specialized.max) },
            { scriptName: 'Tdata AppStore stealer', count: getRandomInt(ranges.specialized.min, ranges.specialized.max) },
            { scriptName: 'Tdata Windows stealer', count: getRandomInt(ranges.specialized.min, ranges.specialized.max) },
            { scriptName: 'VSCode Light Mode', count: getRandomInt(ranges.specialized.min, ranges.specialized.max) }
        ];

        // Bulk create all records
        await Promise.all(
            initialPayloads.map(payload => Download.create(payload))
        );

        console.log('Initial data seeded with random download counts!');
    } catch (error) {
        console.error('Failed to initialize database:', error);
    }
}

initializeDatabase();
