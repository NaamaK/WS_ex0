'use strict';

var http = 			require('http');
var eventsConfig = 	require('./eventsConfig').events;
var Hotel =			require('./hotel');
var hotelsConfig = 	require('./hotelsConfig').hotels;

var logText = '';						//string for all server log

function displayLikes(hotelBranch, hotelName, likes) {	//display current likes amount
	var log = hotelBranch + ' "' + hotelName + '" has ' + likes + ' likes!';
	console.log(saveLog(log));
}

function negativeLikesError(hotelBranch, hotelName, likes) {  //display error for reducing more likes than actually have
	var log = 'Error! you can`t reduce likes under zero.';
	console.log(saveLog(log));
}

function saveLog(text) {  //saving all the logs in one variable
	logText += text + '\n';
	return text;
}

var hotel = new Hotel(hotelsConfig.Milton.name, hotelsConfig.Milton.branch);					//creating new instance of hotel
hotel.on(eventsConfig.LikesChanged, displayLikes);			//configures action when likes amount will change
hotel.on(eventsConfig.NegativeLikes, negativeLikesError);	//configures action when likes amount reduce to negative

hotel.increase(10);						//likes = 10
hotel.reduce(5);						//likes = 5
hotel.reduce(20);						//likes = 0 (negativeError)

http.createServer(function(req,res) {
	res.writeHead(200);					//status code
	res.write('Success!!!\n\n');		//response body
	res.write(logText);					//print to browser
	res.end();							//close connection
}).listen(8080);						//listen for connection on this port
console.log('\nlistening on port 8080 ...');