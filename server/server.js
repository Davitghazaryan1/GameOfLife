var express = require("express");
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static("../client"));


app.get("/", function (req, res) {
    res.redirect("index.html");
});


server.listen(3000, function () {
    console.log("Example is running on port 3000");
});



io.on('connection', function (socket) {
    
        socket.emit("name", "David");
    
    // socket.on("send message", function (data) {
    //     messages.push(data);
    //     io.sockets.emit("display message", data);
    // });
});



