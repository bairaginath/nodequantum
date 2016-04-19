var mysql=require('mysql')

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'nodedb'
});

module.exports=connection;