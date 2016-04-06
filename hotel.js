'use strict';

var EventEmitter = 		require('events');
var eventsConfig = 	require('./eventsConfig').events;

module.exports = class Hotel extends EventEmitter {

	constructor(hotelName, hotelBranch) {
		super();						//call constructor of EventEmmiter
		this.likes = 0;
		this.hotelName = hotelName;
		this.branch = hotelBranch;
	}

	reduce(amount) {
		if (this.likes - amount < 0) {	//check if likes amount reduced to negative
			this.likes = 0;
			this.emit(eventsConfig.NegativeLikes, this.branch, this.hotelName, this.likes);	//fire negative error
		}
		else this.likes -= amount;
		this.emit(eventsConfig.LikesChanged, this.branch, this.hotelName, this.likes);		//fire likes amount changed
	}

	increase(amount) {
		this.likes += amount;
		this.emit(eventsConfig.LikesChanged, this.branch, this.hotelName, this.likes);		//fire likes amount changed
	}
}