const express = require('express');
const mysql = require('mysql');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('app/public'));

const connection = mysql.createConnection(process.env.JAWSDB_URL);
connection.connect(function(err) {
    console.log(`Connected to Database!`);
});


require('./app/routing/htmlRoutes')(app);
require('./app/routing/apiRoutes')(app);

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});

