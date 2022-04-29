import sql from "mysql"
const con = sql.createConnection( 
    {
        host: "db4free.net",
        user: "tubesstima3",
        password : "tubesstima3",
        database : "penyakit"
    }
);

export default con;