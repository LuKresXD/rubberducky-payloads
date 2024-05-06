const { DataTypes } = require('sequelize');
const sequelize = require('../lib/db');

const Download = sequelize.define('Download', {
    scriptName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    count: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
});

module.exports = Download;
