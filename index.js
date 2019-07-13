const config = require('config');
const mongoose = require('mongoose');
const express = require('express');
const usersRoute = require('./routes/users');
const app = express();

/**
 * get the jwtPrivateKey
 */
if (!config.get('jwtPrivateKey')) {
    console.log('Failed to load config: jwtPrivateKey');
    process.exit(1);
}

/**
 * connect to the localhost mongodb database.
 * name of the database: node_api_project
 */
mongoose.connect('mongodb://localhost/node_api_project', { 
    useCreateIndex: true,
    useNewUrlParser: true 
}).then(() => console.log('Connected to MongoDB.'))
    .catch(err => {
        console.error('Error', err)
        process.exit(1);
    });

app.use(express.json());

/**
 * routes
 */
app.use('/api/users', usersRoute);

/**
 * listen to the port
 */
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port}.`));