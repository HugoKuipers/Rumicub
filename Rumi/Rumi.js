"use strict";
var amountOfPlayers = 4;
var takenSeats = [];
var allStones = {};
for(var i = 1; i < 14; i++) {
  for(var j = 0; j < 4; j++) {
    var stoneColor = "Zwart";
    switch(j%4) {
      case 0:
        stoneColor = "Blauw";
        break;
      case 1:
        stoneColor = "Rood";
        break;
      case 2:
        stoneColor = "Oranje";
        break;
    };
    allStones[stoneColor+" "+i] = {
      color: stoneColor,
      value: i,
      amount: 2
    };
  };
};

var Player = function(human, name, order, strength) {
  this.human = human;
  if(!human) {
    this.name = markovNameGen("dutch");
    if(!strength) {
      this.strength = Math.ceil(Math.random()*3);
    }
    else {
      this.strength = strength;
    };
  }
  else {
    if(!name) {
      this.name = markovNameGen("dutch");
    }
    else {
      this.name = name;
    };
  };
  if(!order) {
    this.order = Math.ceil(Math.random()*amountOfPlayers);
    while(takenSeats.includes(this.order)) {
      this.order = Math.ceil(Math.random()*amountOfPlayers);
    };
    takenSeats.push(this.order);
  }
  else {
    this.order = order;
  };
};

console.log(allStones);
