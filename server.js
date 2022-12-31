const express = require('express') ;
const ejs = require('ejs') ;
const path = require('path') ;
const MongoClient = require('mongodb').MongoClient ;
// const Notes = require('./models/notes') ;

const app = express() ;
// app.engine('ejs') ;
app.use(express.static(path.join(__dirname, 'public'))) ;
app.use(express.urlencoded({ extended : true })) ;


app.get('/', async (req, res) => {
    let response = [] ;
    MongoClient.connect('mongodb://admin:password@localhost:27017', function(err, client) {
        var db = client.db('notes_app') ;
        // console.log("database successfully connected") ;
        // let myquery = { } ;
        // db.collection("notes").findOne({ }, function(err, result) {
        //     if(err) throw err ;
        //     response =  result ;
        //     client.close() ;
        //     console.log(response) ;
        //     res.render('index.ejs', {response}) ;
        // })
        const cursor = db.collection("notes").find() ;
        cursor.forEach((result) => {
            response.push(result) ;
            console.log(response) ;
        }, console.log(response)) ;
    })
})

app.post('/submit', (req, res) => {
    let userObj = req.body ;
    console.log(req.body) ;
    res.send(req.body) ;
    MongoClient.connect('mongodb://admin:password@localhost:27017', function(err, client) {
        var db = client.db('notes_app') ;
        console.log("database successfully connected") ;
        let myquery = {} ;
        let newvalue = { $set : userObj } ;
        db.collection('notes').insertOne(req.body) ;
    })
})

app.listen(3000, () => {
    console.log("listening at port 3000") ;
})