const sequelize = require('../lib/db');
const Scan = require('../models/Scan');

sequelize.sync({ force: true }).then(() => {
    console.log('Database & tables created!');
});
