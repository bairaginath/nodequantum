var persistence = require('persistencejs');
var User = persistence.define('user', {
    email: "TEXT",
    password : "TEXT",
    first_name : "TEXT",
    last_name : "TEXT"
});

module.exports=User