
var request = require('request');

/*
$.ajax({
    url : "http://localhost:8081/listUsers",
    method : "GET"
})*/


request.get("http://localhost:8081/dbUser/findAllUsers").on('response',function(response){
    console.log(response.statusCode);
    var responseString = '';


    response.on('data', function(data) {
       
        responseString += data;
    });

    response.on('end', function() {
        console.log(responseString);
        var responseObject = JSON.parse(responseString);

    });

})