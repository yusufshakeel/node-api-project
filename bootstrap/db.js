const mongoose = require('mongoose');

/**
 * connect to the localhost mongodb database.
 * name of the database: node_api_project
 */
module.exports = function() {
    mongoose.connect('mongodb://localhost/node_api_project', { 
        useCreateIndex: true,
        useNewUrlParser: true 
    }).then(() => {
        console.log('Connected to MongoDB.');
    })
    .catch(err => {
        throw new Error('FATAL ERROR: Failed to connect to MongoDB.');
    });
};