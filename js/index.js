var board = {
  a1: " ", a2: " ", a3: " ", 
  b1: " ", b2: " ", b3: " ", 
  c1: " ", c2: " ", c3: " ", 
}
var winConditions = [
  ["a1", "a2", "a3"],
  ["b1", "b2", "b3"],
  ["c1", "c2", "c3"],
  ["a1", "b1", "c1"],
  ["a2", "b2", "c2"],
  ["a3", "b3", "c3"],
  ["a1", "b2", "c3"],
  ["a3", "b2", "c1"],
]

var listOfSquares = ["a1", "a2", "a3", "b1", "b2", "b3", "c1", "c2", "c3"]

function printBoard(){
  console.log(board.a1 + "|" + board.a2 + "|" + board.a3);
  console.log(board.b1 + "|" + board.b2 + "|" + board.b3);
  console.log(board.c1 + "|" + board.c2 + "|" + board.c3);
}

function clearBoard(){
  for (var x in board){
    board[x] = " ";
    document.getElementById(x).innerHTML = " "
  };
}

function playMove(player, square){
  //ex playMove("X", "a2")
  board[square] = player;
  document.getElementById(square).innerHTML = player;
}

function squareState(status, square){
  return board[square] === status; 
}

function isThreeInARow(status, array){
  for (var i = 0; i < 3; i++){
    if (board[array[i]] !== status){
      return false;
    }
  }
  return true;
};

function isTwoOutOfThree(oOrX, array){
  // returns a square to play or -1 
  var listOfOsOrXs = [];
  var listOfEmptySquares = [];
  for (var i = 0; i < 3 ; i++){
    if (board[array[i]] === " "){
      listOfEmptySquares.push(array[i]);
    }
    if (board[array[i]] === oOrX){
      listOfOsOrXs.push(array[i]);
    }
  }
  if ((listOfOsOrXs.length === 2) && (listOfEmptySquares.length === 1)){
    return listOfEmptySquares[0]
  }
  else{
    return -1
  }
}

function findTwoOutOfThree(status, array){
  for (var i = 0; i < array.length; i++){
    if(isTwoOutOfThree(status, array[i]) !== -1){
      return isTwoOutOfThree(status, array[i]);
    }
  }
  return -1;
}


function findRandom(){
  //needs something to check if all squares are occupied
  var randomSquare = listOfSquares[Math.floor(Math.random() * 9)];
  if (board[randomSquare] === " "){
    return randomSquare;
  }
  else{
    return findRandom();
  }
}

function isGameOver(){
  //returns win conditions ("X", "O" or "Draw"), else false
  for (var i = 0; i < winConditions.length; i++){
    if (isThreeInARow("O", winConditions[i])){
      return "O";
    }
    if (isThreeInARow("X", winConditions[i])){
      return "X";
    };
  };
  var fullBoard = true;
  for (var i in board){
    if(board[i] === " "){
      fullBoard = false;
    }
  }
  if(fullBoard){
    return "Draw";
  }
  return false;
}

function AI(player){
  var opponent;
  if (player === "X"){
    opponent = "O";
  }
  else {
    opponent = "X";
  }
  if (findTwoOutOfThree(player, winConditions) !== -1){
    return findTwoOutOfThree(player, winConditions);
  }
  else if (findTwoOutOfThree(opponent, winConditions) !== -1){
    return findTwoOutOfThree(opponent, winConditions);
  }
  else {
    return findRandom()
  }
}

var humanIs = "X", computerIs = "O"
var numberOfHumanWins = 0, numberOfComputerWins = 0, numberOfDraws = 0;

function updateScore(){
  document.getElementById("score").innerHTML =  "You: " + numberOfHumanWins + "    Computer: " + numberOfComputerWins + "    Draw: " + numberOfDraws;
}

updateScore();

function letsPlay(square){
  if (squareState(" ", square)){
    playMove(humanIs, square);
    if (isGameOver() === false) {
      playMove(computerIs, AI(computerIs));
      if (!(isGameOver() === false)){
        resetGame(isGameOver())
      }
    }
    else { 
      resetGame(isGameOver());
    }    
  }
}

function resetGame(winCondition){
  if (winCondition === "X"){
    if(humanIs === "X"){
      numberOfHumanWins++;
    }
    else{
      numberOfComputerWins++;
    }
  }
  else if (winCondition === "O"){
    if(humanIs === "O"){
      numberOfHumanWins++;
    }
    else{
      numberOfComputerWins++;
    }
  }
  else {
    numberOfDraws++
  }
  var temp = humanIs;
  humanIs = computerIs;
  computerIs = temp;
  clearBoard();
  updateScore();
  if (computerIs === "X"){
    playMove(computerIs, AI(computerIs));
  }
}
document.getElementById("a1").onclick = function (){
  return letsPlay("a1");
}
document.getElementById("a2").onclick = function (){
  return letsPlay("a2");
}
document.getElementById("a3").onclick = function (){
  return letsPlay("a3");
}
document.getElementById("b1").onclick = function (){
  return letsPlay("b1");
}
document.getElementById("b2").onclick = function (){
  return letsPlay("b2");
}
document.getElementById("b3").onclick = function (){
  return letsPlay("b3");
}
document.getElementById("c1").onclick = function (){
  return letsPlay("c1");
}
document.getElementById("c2").onclick = function (){
  return letsPlay("c2");
}
document.getElementById("c3").onclick = function (){
  return letsPlay("c3");
}

