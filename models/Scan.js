const { DataTypes } = require('sequelize');
const sequelize = require('../lib/db');

const Scan = sequelize.define('Scan', {
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    result: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

module.exports = Scan;
