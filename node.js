var express = require('express');
var cors = require('cors');
var app = express();

app.use(cors());

let bodyParser = require('body-parser');

// Create application/x-www-form-urlencoded parser
let urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // for reading JSON

var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "uosh6quu",
    database: "neverhaveiever"
});

con.connect((err) => {
    if(!err) console.log("Connection succeed");
    else console.log("Connection failed");
});

// GET ALL INFO
app.get('/neverever', (req, res) => {
    con.query('SELECT * FROM neverever', (err, rows) => {
        if (!err) {
            console.log(rows);
            res.send(rows);
        } else console.log(err);
    });
});

// GET SINGLE INFO
app.post(`/neverever/prompt`, (req, res) =>{
    con.query('SELECT * FROM neverever WHERE statement LIKE ?', '%' + [req.body.statement] + '%',(err, rows) =>{
       if(!err) res.send(rows);
       else console.log(err);
    });
});

// DELETE THE INFO
app.delete('/neverever/:id', function (req, res){
    con.query('DELETE FROM neverever WHERE id = ?',[req.params.id],(err, rows)=>{
        if(!err){
            res.send('Deleted succesfully.');
            console.log(rows);
        }else{
            console.log(err);
        }
    });
});

// UPDATE THE INFO
app.put('/neverever', (req, res) =>{
    con.query('UPDATE neverever SET statement = ? WHERE id = ?', [req.body.statement, req.body.id], (err, rows)=>{
       if(!err) res.send(rows);
       else console.log(err);
    });
});

// ADD NEW INFO
app.post('/neverever/add', (req, res) =>{
    var jsonObj = req.body;

    con.query('INSERT INTO neverever(name, statement, kieli) VALUES(?,?,?)', [jsonObj.name, jsonObj.statement, jsonObj.kieli], (err, rows)=>{
        if(!err) {
            res.send("Prompt added.");
            console.log(rows);
        }
        else console.log(err);
    });
});

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
});