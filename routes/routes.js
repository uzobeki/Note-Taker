const fs = require('fs');
const path = require('path');

module.exports = app => {
    fs.readFile("db/db.json", "utf8", (err,data) => {
        if (err) throw err;
        var notes = JSON.parse(data);

        // API Route
        app.get("/api/notes", function(req, res) {
            res.json(notes);
        });

        app.post("/api/notes", function(req, res) {
            let addNote = req.body;
            notes.push(addNote);
            updateDB();
        });

        app.get("/api/notes/:id", function(req, res) {
            notes.splice(req.params.id, 1);
            updateDB();
        });
        
        app.get("/api/notes/:id", function(req,res) {
            res.json(notes[req.params.id]);
        });

        // Routes

        app.get('/notes', function(req,res) {
            res.sendFile(path.join(__dirname, "../public/notes.html"));
        });

        app.get('*', function(req,res) {
            res.sendFile(path.join(__dirname, "../public/index.html"))
        });

        function updateDB() {
            fs.writeFile("db/db.json", JSON.stringify(notes, '\t'),err => {
                if (err) throw err;
                return true;
            });
        }
    });
}