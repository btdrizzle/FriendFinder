const path = require('path');

module.exports = function(app){
    app.get("/survey", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/survey.html"));
    });
      
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });
    app.get("/:choice", function(req,res) {
        const choice = req.params.choice;
        if(choice !== "api") {
            res.sendFile(path.join(__dirname, "../public/home.html"));
        }
    });
};
