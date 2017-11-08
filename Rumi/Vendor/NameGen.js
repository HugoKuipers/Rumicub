"use strict";
var jsonNameLists = nameLists;

nameGen = function() {
  var nameLength = 3 + Math.floor(Math.random()*7);
  var firstLetter = String.fromCharCode(65 + Math.floor(Math.random()*26));
  var vowelsCatOne = ["a", "e"];
  var vowelsCatTwo = ["a", "e", "i", "u", "o"];
  var vowelsCatThree = ["a", "e", "i", "u", "o", "y"];
  var vowelCheck = ["y"];
  var consonantsCatOne = ["n", "l", "r", "s", "t"];
  var consonantsCatTwo = ["n", "l", "r", "s", "t", "h", "d", "m", "c", "j", "k", "b"];
  var consonantsCatThree = ["q", "w", "r", "t", "p", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m"];
  var consonantCheck = ["q", "w", "p", "f", "g", "z", "x", "v",];
  var madeUpName = firstLetter;
  var checkLetter = firstLetter.toLowerCase();
  var prevLetter = "";
  var nextLetterCV = "";
  for(var i = 1; i < nameLength; i++) {
    if(vowelCheck.includes(checkLetter)) {
      nextLetterCV = "C";
    }
    else if(consonantCheck.includes(checkLetter)) {
      nextLetterCV = "V";
    }
    else if(vowelsCatThree.includes(checkLetter) && vowelsCatThree.includes(prevLetter)) {
      nextLetterCV = "C";
    }
    else if(consonantsCatThree.includes(checkLetter) && consonantsCatThree.includes(prevLetter)) {
      nextLetterCV = "V";
    }
    else if(vowelsCatThree.includes(checkLetter)) {
      if(Math.floor(Math.random()*3) === 2) {
        nextLetterCV = "V";
      }
      else {
        nextLetterCV = "C";
      };
    }
    else if(consonantsCatThree.includes(checkLetter)) {
      if(Math.floor(Math.random()*3) === 2) {
        nextLetterCV = "C";
      }
      else {
        nextLetterCV = "V";
      };
    }
    else {
      if(Math.floor(Math.random()*2) === 1) {
        nextLetterCV = "C";
      }
      else {
        nextLetterCV = "V";
      };
    };
    var pickCat = Math.floor(Math.random()*5);
    if(nextLetterCV === "C") {
      if(pickCat === 0 || pickCat === 1) {
        if(consonantsCatThree.includes(checkLetter)) {
          pickCat = consonantsCatTwo;
        }
        else {
          pickCat = consonantsCatThree;
        };
      }
      else if(pickCat === 2 || pickCat === 3) {
        pickCat = consonantsCatTwo;
      }
      else if(pickCat === 4) {
        pickCat = consonantsCatOne;
      };
    }
    else if(nextLetterCV === "V") {
      if(pickCat === 0 || pickCat === 1) {
        if(vowelsCatThree.includes(checkLetter)) {
          pickCat = vowelsCatTwo;
        }
        else {
          pickCat = vowelsCatThree;
        };
      }
      else if(pickCat === 2 || pickCat === 3) {
        pickCat = vowelsCatTwo;
      }
      else if(pickCat === 4) {
        pickCat = vowelsCatOne;
      };
    };
    prevLetter = checkLetter;
    checkLetter = pickCat[Math.floor(Math.random()*pickCat.length)];
    madeUpName += checkLetter;
  };
  if(allGenNames.includes(madeUpName)) {
    nameGen();
  }
  else {
    allGenNames.push(madeUpName);
    return madeUpName;
  };
};

createMarkovData = function(list, dataName) {
  var firstLetters = {};
  var secondLetters = {};
  var letterCombos = {};
  for(var i in list) {
    if(firstLetters[list[i].substr(0,1)]) {
      firstLetters[list[i].substr(0,1)] += 1;
    }
    else {
      firstLetters[list[i].substr(0,1)] = 1;
    };
    if(secondLetters[list[i].substr(0,1)]) {
      if(secondLetters[list[i].substr(0,1)][list[i].substr(1,1)]) {
        secondLetters[list[i].substr(0,1)][list[i].substr(1,1)] += 1;
      }
      else {
        secondLetters[list[i].substr(0,1)][list[i].substr(1,1)] = 1;
      };
    }
    else {
      secondLetters[list[i].substr(0,1)] = {};
      secondLetters[list[i].substr(0,1)][list[i].substr(1,1)] = 1;
    };
    for(var j = 2; j < list[i].length; j++) {
      if(letterCombos[list[i].substr((j-2),2).toLowerCase()]) {
        if(letterCombos[list[i].substr((j-2),2).toLowerCase()][list[i].substr(j,1)]) {
          letterCombos[list[i].substr((j-2),2).toLowerCase()][list[i].substr(j,1)] += 1;
        }
        else {
          letterCombos[list[i].substr((j-2),2).toLowerCase()][list[i].substr(j,1)] = 1;
        };
      }
      else {
        letterCombos[list[i].substr((j-2),2).toLowerCase()] = {};
        letterCombos[list[i].substr((j-2),2).toLowerCase()][list[i].substr(j,1)] = 1;
      };
    };
    if(letterCombos[list[i].substr((list[i].length-2),2).toLowerCase()]) {
      if(letterCombos[list[i].substr((list[i].length-2),2).toLowerCase()]["EndHere"]) {
        letterCombos[list[i].substr((list[i].length-2),2).toLowerCase()]["EndHere"] += 1;
      }
      else {
        letterCombos[list[i].substr((list[i].length-2),2).toLowerCase()]["EndHere"] = 1;
      };
    }
    else {
      letterCombos[list[i].substr((list[i].length-2),2).toLowerCase()] = {};
      letterCombos[list[i].substr((list[i].length-2),2).toLowerCase()]["EndHere"] = 1;
    };
  };
  markovData[dataName] = {
    firstLetters: firstLetters,
    secondLetters: secondLetters,
    letterCombos: letterCombos
  };
};
markovNameGen = function(data) {
  if(!(markovData[data])) {
    createMarkovData(jsonNameLists[data], data);
  };
  var completeLetters = 0;
  while(completeLetters === 0) {
    var greatestChance = 0;
    for(var i in markovData[data]["firstLetters"]) {
      if(greatestChance < markovData[data]["firstLetters"][i]) greatestChance = markovData[data]["firstLetters"][i];
    };
    var thresholdChance = Math.ceil(Math.random()*greatestChance);
    var thisLetterPerhaps = Math.floor(Math.random()*(Object.keys(markovData[data]["firstLetters"]).length));
    if(markovData[data]["firstLetters"][Object.keys(markovData[data]["firstLetters"])[thisLetterPerhaps]] >= thresholdChance) {
      var madeUpName = Object.keys(markovData[data]["firstLetters"])[thisLetterPerhaps];
      completeLetters += 1;
    };
  };
  while(completeLetters === 1) {
    greatestChance = 0;
    for(var i in markovData[data]["secondLetters"][madeUpName]) {
      if(greatestChance < markovData[data]["secondLetters"][madeUpName][i]) greatestChance = markovData[data]["secondLetters"][madeUpName][i];
    };
    var thresholdChance = Math.ceil(Math.random()*greatestChance);
    var thisLetterPerhaps = Math.floor(Math.random()*(Object.keys(markovData[data]["secondLetters"][madeUpName]).length));
    if(markovData[data]["secondLetters"][madeUpName][Object.keys(markovData[data]["secondLetters"][madeUpName])[thisLetterPerhaps]] >= thresholdChance) {
      madeUpName += Object.keys(markovData[data]["secondLetters"][madeUpName])[thisLetterPerhaps];
      var workUpName = madeUpName.toLowerCase();
      completeLetters += 1;
    };
  };
  var endOfTheLine = false;
  while(completeLetters < 7) {
    greatestChance = 0;
    for(var i in markovData[data]["letterCombos"][workUpName.substr(completeLetters-2, 2)]) {
      if(greatestChance < markovData[data]["letterCombos"][workUpName.substr(completeLetters-2, 2)][i]) greatestChance = markovData[data]["letterCombos"][workUpName.substr(completeLetters-2, 2)][i];
    };
    var thresholdChance = Math.ceil(Math.random()*greatestChance);
    var thisLetterPerhaps = Math.floor(Math.random()*(Object.keys(markovData[data]["letterCombos"][workUpName.substr(completeLetters-2, 2)]).length));
    if(markovData[data]["letterCombos"][workUpName.substr(completeLetters-2, 2)][Object.keys(markovData[data]["letterCombos"][workUpName.substr(completeLetters-2, 2)])[thisLetterPerhaps]] >= thresholdChance) {
      if(Object.keys(markovData[data]["letterCombos"][workUpName.substr(completeLetters-2, 2)])[thisLetterPerhaps] === "EndHere" && completeLetters === 2) {}
      else if(Object.keys(markovData[data]["letterCombos"][workUpName.substr(completeLetters-2, 2)])[thisLetterPerhaps] === "EndHere") {
        endOfTheLine = true;
        completeLetters = 7;
      }
      else {
        madeUpName += Object.keys(markovData[data]["letterCombos"][workUpName.substr(completeLetters-2, 2)])[thisLetterPerhaps];
        workUpName = madeUpName.toLowerCase();
        completeLetters += 1;
      };
    };
  };
  while(endOfTheLine === false && completeLetters < 11) {
    if(Object.keys(markovData[data]["letterCombos"][workUpName.substr(completeLetters-2, 2)]).includes("EndHere")) {
      endOfTheLine = true;
    }
    else {
      greatestChance = 0;
      for(var i in markovData[data]["letterCombos"][workUpName.substr(completeLetters-2, 2)]) {
        if(greatestChance < markovData[data]["letterCombos"][workUpName.substr(completeLetters-2, 2)][i]) greatestChance = markovData[data]["letterCombos"][workUpName.substr(completeLetters-2, 2)][i];
      };
      var thresholdChance = Math.ceil(Math.random()*greatestChance);
      var thisLetterPerhaps = Math.floor(Math.random()*(Object.keys(markovData[data]["letterCombos"][workUpName.substr(completeLetters-2, 2)]).length));
      if(markovData[data]["letterCombos"][workUpName.substr(completeLetters-2, 2)][Object.keys(markovData[data]["letterCombos"][workUpName.substr(completeLetters-2, 2)])[thisLetterPerhaps]] >= thresholdChance) {
        madeUpName += Object.keys(markovData[data]["letterCombos"][workUpName.substr(completeLetters-2, 2)])[thisLetterPerhaps];
        workUpName = madeUpName.toLowerCase();
        completeLetters += 1;
      };
    };
  };
  if(allGenNames.includes(madeUpName)) {
    markovNameGen(data);
  }
  else {
    allGenNames.push(madeUpName);
    return madeUpName;
  };
};
