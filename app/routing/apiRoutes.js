const mysql = require('mysql');
const connection = mysql.createConnection(process.env.JAWSDB_URL);

module.exports = function(app) {
    //Returns ALL 
    app.get("/api/friends", function(req, res) {
        connection.query(`SELECT * FROM userData`, function(err,result) {
            if(err) throw(err);
            console.log(result);
            res.json(result);
        })
    });
    app.post("/api/friends", function(req, res) {
        // req.body hosts is equal to the JSON post sent from the user
        // This works because of our body parsing middleware
        const newFriend = req.body;
        connection.beginTransaction(function(err) {
            if(err) throw err;
            connection.query(`INSERT INTO userData SET ?`,newFriend,function(error,rows) {
                if(error) {
                    return connection.rollback(function() {
                        throw error
                    });
                }
                connection.query(`SELECT * FROM userData`,function(error,results) {
                    if(error) {
                        return connection.rollback(function() {
                            throw error;
                        });
                    }
                    connection.commit(function(err) {
                        if(err) {
                            return connection.rollback(function() {
                                throw err;
                            })
                        }
                        console.log(results);
                    });
                });
            });
        });
    });
}   