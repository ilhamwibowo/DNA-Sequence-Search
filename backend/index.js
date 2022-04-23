import sql from "mysql"
import express from "express"
import bodyParser from "body-parser"
// const sql = require('mysql');
// const express = require('express');
// const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080;
var app = express();
app.use(express.json())
var con = sql.createConnection( 
    {
        host: "db4free.net",
        user: "tubesstima3",
        password : "tubesstima3",
        database : "penyakit"
    }
);

con.connect(function(err) {
    if (err) throw err;
    console.log("Database Connected!");   

});

app.get("/", function(req,res) {
    res.send("hello world");
})

app.listen(PORT, function(){
    console.log(`connected to port ${PORT}`);
})

app.get("/fetch", function(req,res) {
    con.query("SELECT * FROM sequence", function(error,result,fields) {
        res.json(result);
    })
})

app.post("/penyakit/add", function(req, res) {
    const data = req.body; //harusnya req
    let query = "INSERT INTO sequence (Nama_Penyakit, DNASequence) VALUES ('"+data.Nama_Penyakit + "','"+ data.DNASequence + "');";
    con.query(query, function(error,result,fields) {
        if (error) {
            res.json(error);
        }
        else {
            res.json({message:"Success!"});
        }

    })
})

app.post("/hasil/add", function(req,res) {
    const data = req.body;
    let query = "INSERT INTO hasil (Tanggal, Nama, Nama_Penyakit,Prediksi) VALUES ('"+data.Nama + "','"+ data.Nama_Penyakit + "','"+data.Prediksi + "');";
    con.query(query, function(error,result,fields) {
        if (error) {
            res.json(error);
        }
        else {
            res.json({message:"Success!"});
        }

    }) 
})

app.delete("/penyakit/delete", function(req,res) {
    const data = req.body;
    let query = "DELETE FROM sequence WHERE Nama_Penyakit = '"+data.Nama_Penyakit + "');";
    con.query(query, function(error,result,fields) {
        if (error) {
            res.json(error);
        }
        else {
            res.json({message:"Success!"});
        }

    })    
})