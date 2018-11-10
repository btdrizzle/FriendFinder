const mysql = require('mysql');

module.exports = function(app) {
    const connection = mysql.createConnection(process.env.JAWSDB_URL);
    connection.connect(function(err) {
        if(err) throw err;
        console.log(`Connected to Database!`);
    });
    app.get("/api/characters", function(req, res) {
        return res.json(characters);
    });
    app.post("/api/characters", function(req, res) {
        // req.body hosts is equal to the JSON post sent from the user
        // This works because of our body parsing middleware
       const newcharacter = req.body;
    
        // Using a RegEx Pattern to remove spaces from newCharacter
        // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
        newcharacter.routeName = newcharacter.name.replace(/\s+/g, "").toLowerCase();
    
        console.log(newcharacter);
    
        characters.push(newcharacter);
    
        res.json(newcharacter);
    });
}   