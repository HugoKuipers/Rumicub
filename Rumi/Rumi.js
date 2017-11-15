"use strict";
var amountOfPlayers = 4;
var players = [];
var takenSeats = [];
var decksAmount = 2;
var pileStones;
var boardStones;
var allStones;

var setDeck = function(deckAmount) {
  if(!deckAmount) deckAmount = decksAmount;
  var pileStones = [];
  var boardStones = [];
  // var allStones = {};
  //
  // for(var i = 1; i < 14; i++) {
  //   for(var j = 0; j < 4; j++) {
  //     var stoneColor = "Zwart";
  //     switch(j%4) {
  //       case 0:
  //         stoneColor = "Blauw";
  //         break;
  //       case 1:
  //         stoneColor = "Rood";
  //         break;
  //       case 2:
  //         stoneColor = "Oranje";
  //         break;
  //     }
  //     allStones[stoneColor+" "+i] = {
  //       color: stoneColor,
  //       value: i,
  //       amount: deckAmount
  //     }
  //   }
  // }
  // allStones["Joker"] = {
  //   color: "Joker",
  //   value: 0,
  //   amount: deckAmount
  // }

  for(var i = 1; i < 14; i++) {
    for(var j = 0; j < 4; j++) {
      for(var k = 0; k < deckAmount; k++) {
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
        }
        pileStones.push({
          name: stoneColor+" "+i,
          color: stoneColor,
          value: i
        });
      }
    }
  }
  for(var k = 0; k < deckAmount; k++) {
    pileStones.push({
      name: "Joker",
      color: "Joker",
      value: 0
    });
  }
}

const createPlayTable = function() {
  for(var i = 0; i < 13; i++) {
    var createTr = taby.insertRow(i);
    for(var j = 0; j < 13; j++) {
      createTr.insertCell(j);
    }
  }
}

var Player = function(human, name, order, strength) {
  this.human = human;
  if(!human) {
    this.name = markovNameGen("dutch");
    if(!strength) {
      // this.strength = Math.ceil(Math.random()*3);
      this.strength = 1;
    }
    else {
      this.strength = strength;
    }
  }
  else {
    if(!name) {
      this.name = markovNameGen("dutch");
    }
    else {
      this.name = name;
    }
  }
  if(!order) {
    this.order = Math.ceil(Math.random()*amountOfPlayers);
    while(takenSeats.includes(this.order)) {
      this.order = Math.ceil(Math.random()*amountOfPlayers);
    }
    takenSeats.push(this.order);
  }
  else {
    this.order = order;
    while(takenSeats.includes(this.order)) {
      this.order = Math.ceil(Math.random()*amountOfPlayers);
    }
  }
  this.hand = [];
  this.pass = function() {

  }
  this.play = function() {

  }
}

setDeck();

var guy = new Player();

var widthS = $(this.screen.width);
var heigthS = $(this.screen.heigth);
if($(this.screen.width)[0] < $(this.screen.height)[0]) {
  $('#entire-playfield').css({
    width: '100vw',
    height: '100vw'
  });
}
