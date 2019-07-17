const express = require('express');
const app = express();

require('./bootstrap/config')();
require('./bootstrap/db')();
require('./bootstrap/routes')(app);

const port = process.env.node_api_project_PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port}.`));
