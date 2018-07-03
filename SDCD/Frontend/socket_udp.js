
var PORT = 33333;
var HOST = '0.0.0.0';
var dgram = require('dgram');
var server = dgram.createSocket('udp4');
var app = require('express')();
const serve   = require('express-static');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var opn= require('opn');
var fs = require('fs');
var newLine= "\r\n";



const Json2csvParser = require('json2csv').Parser;
var fields = ['message', 'seq', 'sent','arrived'];
const header = false;
const opts = { fields, header};
const parser = new Json2csvParser(opts);



app.use(serve(__dirname + '/'));


app.get('/tx.html', function(req, res){
    res.sendFile(__dirname + '/tx.html');
});

app.get('/index.html', function(req, res){
    res.sendFile(__dirname + '/index.html');
});
app.get('/', function(req, res){
    res.sendFile(__dirname + '/rx.html');
});


server.on('error', (err) => {
    console.log(`UDP SERVER ERROR:\n${err.stack}`);
    server.close();
});

server.on('listening', function () {
    var address = server.address();
    console.log('UDP SERVER IS RUNNING ON PORT ' + "" + address.port);
});

server.on('message', function (message, remote) {
   
    var mex=message.toString().split("message");
    //console.log(mex[1]);
    //var mex=message.toString();
   // var text=mex.substring(mex.indexOf('['),mex.indexOf(']'));
    console.log(remote.address + ':' + remote.port +' - ' + mex[1] );
    var time = new Date();
    var timestamp= time.getHours().toString() +":"+time.getMinutes().toString()+":"+time.getSeconds().toString()+":"+time.getMilliseconds().toString();
    var upd="message"+mex[1] +", arrived:'"+ timestamp;
    console.log(upd);

    var newstring =upd.replace("message", "\"message\"").replace("seq", "\"seq\"").replace("sent", "\"sent\"").replace("arrived", "\"arrived\"");

while (newstring.indexOf("'") >= 0)
    {
        var newstring1 = newstring.replace("'", "\"");
        newstring = newstring1;
    }


var str2 = newstring+"\"";

try{
var data = JSON.parse("[{"+str2+"}]");

}

catch(e) {
        alert(e); // error in the above string (in this case, yes)!
}

//const csv = parser.parse(data);

fs.stat('message.csv', function (err, stat) {
    if (err == null) {
        console.log('File exists');
         var csv = parser.parse(data)+ newLine;
        fs.appendFile('message.csv', csv, function (err) {
            if (err) throw err;
            console.log('The "data to append" was appended to file!');
        });
    }
    else {
        //write the headers and newline
        console.log('New file, just writing headers');
        fields= (fields + newLine);
         
        fs.writeFile('message.csv', fields, function (err, stat) {
            if (err) throw err;
            console.log('file saved');
        });
    }
});



 
    io.on('connection', function(){
           
    });
    io.emit('gnuradio', upd);
    console.log('MESSAGE SENT TO WEB PAGE');  
});

server.bind(PORT, HOST);
http.listen(3000, function(){
    console.log('HTTP SERVER IS RUNNING ON PORT 3000');
    opn('http://localhost:3000/rx.html'); 
});






      

    

