import express from "express"
import bodyParser from "body-parser"
import con from "./config/database.js"
import cors from 'cors'
import kmpMatch from "./script/kmp.js"
import bmMatch from "./script/bm.js"
import isTanggal from "./script/regex.js"

const PORT = process.env.PORT || 8080;

var app = express();

app.use(express.json())
app.use(cors())

con.connect(function(err) {
    if (err) throw err;
    console.log("Database Connected!");   

});

app.get("/", function(req,res) {
    res.send("hello world");
})


app.get("/fetch/sequence", function(req,res) {
    con.query("SELECT * FROM sequence", function(error,result,fields) {
        res.json(result);
    })
})

app.get("/fetch/test", function(req,res) {
    con.query("SELECT * FROM hasil", function(error,result,fields) {
        res.json(result);
        for (let i = 0;i < result.length;i++) {
            let date = new Date(result[i].Tanggal);
        }
    })
})

app.post("/search", function(req,res) {
    const data = req.body;
    console.log(data);
    let search = data.query.split(' '); //split untuk mengecek jumlah argumen
    let ret = [];
    con.query("SELECT * FROM hasil", function(error,result,fields) {
        
        if (isTanggal(search[0])) {
            if (search.length > 1) {
                let nama_penyakit = search.slice(1,search.length).join(" ")
                console.log(nama_penyakit);
                for (let i = 0;i < result.length;i++ ){
                    let date = new Date(result[i].Tanggal);
                    let month = date.getMonth()+1;
                    let stringdate = date.getFullYear()+'-'+month+'-'+date.getDate();
                    if (stringdate == search[0]) {
                        if (nama_penyakit == result[i].Nama_Penyakit) {
                            ret.push(result[i]);
                        }
                    }
                }
                res.json(ret);
            }
            else {
                for (let i = 0;i < result.length;i++ ){
                    let date = new Date(result[i].Tanggal);
                    let month = date.getMonth()+1;
                    let stringdate = date.getFullYear()+'-'+month+'-'+date.getDate();
                    console.log(stringdate);
                    if (stringdate == search[0]) {
                        ret.push(result[i]);
                    }
                }
                res.json(ret);
            }

        }
        else {
            let nama_penyakit = search.join(" ")
            console.log(nama_penyakit);
            for (let i = 0;i < result.length;i++ ){
                if (nama_penyakit == result[i].Nama_Penyakit) {
                    ret.push(result[i]);
                }
            }
            res.json(ret);
        }

    })
})

app.post("/penyakit/add", function(req, res) {
    const data = req.body; //harusnya req
    console.log(data);
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
    let name = data.Nama;
    let seq = data.DNASequence;
    let dis = data.Nama_Penyakit;
    let pred = "False";
    let i = 0;
    con.query("SELECT * FROM sequence", function(error,result,fields) {
        for (i=0;i < result.length;i++) {
            if(kmpMatch(seq, result[i].DNASequence) > -1) {
                if(result[i].Nama_Penyakit == dis) {
                    pred = "True";
                }
                break;
            }
        }
        let date_ob = new Date();
        let date = date_ob.getDate();
        let month = (date_ob.getMonth() + 1);
        let year = date_ob.getFullYear();

        let currentdate = year+'-'+month+'-'+date;
        let query = "INSERT INTO hasil (Tanggal, Nama, Nama_Penyakit,Prediksi) VALUES (date('"+currentdate+"'),'"+data.Nama + "','"+ data.Nama_Penyakit + "','"+pred + "');";
        con.query(query, function(error,result,fields) {
            if (error) {
                res.json(error);
            }
            else {
                res.json({currentdate:currentdate, pred:pred});
            }

        }) 
        
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


app.listen(PORT, function(){
    console.log(`connected to port ${PORT}`);
})
