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
                        const me = results[results.length-1];
                        let lowest;
                        let totalDifference;
                        for(let i = 0; i < (results.length - 1); i++) {
                            let difference = Math.abs(me.question1 - results[i].question1) + Math.abs(me.question2 - results[i].question2) + Math.abs(me.question3 - results[i].question3) + Math.abs(me.question4 - results[i].question4) + Math.abs(me.question5 - results[i].question5) + Math.abs(me.question6 - results[i].question6) + Math.abs(me.question7 - results[i].question7) + Math.abs(me.question8 - results[i].question8) + Math.abs(me.question9 - results[i].question9) + Math.abs(me.question10 - results[i].question10);
                            console.log(`${results[i].name} difference: ${difference}`);
                            if(i === 0) {
                                totalDifference = difference;
                                lowest = results[0];
                            }else if(difference < totalDifference) {
                                totalDifference = difference;
                                lowest = results[i];
                            }
                        }
                        res.json(lowest);
                    });
                });
            });
        });
    });
}   