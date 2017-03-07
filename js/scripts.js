//business logic
var player1="";
var player2="";

var throwdice = function () {
  return Math.floor(Math.random()*6)+1;
};

function Player(turn) {
  this.roll = 0;
  this.tempscore = 0;
  this.totalscore = 0;
  this.turn = turn;
  this.playerName;
};

// checking for 1
Player.prototype.rollone = function() {
  if (this.roll === 1) {
  this.tempscore = 0;
  alert("Sorry " + this.playerName + ", you rolled a 1! Your turn is over!");
  } else {
  this.tempscore += this.roll;
  }
};

// hold
Player.prototype.hold = function () {
  this.totalscore += this.tempscore;
  this.tempscore = 0;
  // alert("Your turn is over, pass the mouse!");
};

Player.prototype.checkWinner = function () {
  if (this.totalscore >= 100) {
    alert(this.playerName + ", you win!");
  }
};

Player.prototype.restart = function () {
  this.roll = 0;
  this.tempscore = 0;
  this.totalscore = 0;
  this.playerName = "";
};
var changePlayers = function() {
  $(".player1Name").val("");
  $(".player2Name").val("");
};

// User Interface
$(document).ready(function() {

  $("button#start").click(function(event){
    event.preventDefault();
    player1 = new Player(true);
    player2 =  new Player(false);
    $("#main-window").hide();
    $("#playWindow").show();

    var player1Name = $("#playerOneName").val();
    $("#player1Name").text(player1Name);

    var player2Name = $("#playerTwoName").val();
    $("#player2Name").text(player2Name);

    player1.playerName = player1Name;
    player2.playerName = player2Name;



    alert("Got the names! " +player1Name+ "and "+player2Name);
});


  $("button#player1-roll").click(function(event){
    player1.roll = throwdice();
    $("#dieRoll1").text(player1.roll);
    player1.rollone();
    $("#roundTotal1").text(player1.tempscore);
  });

  $("button#player2-roll").click(function(event){
    player2.roll = throwdice();
    $("#dieRoll2").text(player2.roll);
    player2.rollone();
    $("#roundTotal2").text(player2.tempscore);
  });

  $("button#player1-hold").click(function(event){
    player1.hold();
    $("#totalScore1").text(player1.totalscore);
    $("#roundTotal1").empty();
    $("#dieRoll1").empty();
    player1.checkWinner();
  });

  $("button#player2-hold").click(function(event){
    player2.hold();
    $("#totalScore2").text(player2.totalscore);
    $("#roundTotal2").empty();
    $("#dieRoll2").empty();
    player2.checkWinner();
  });
  $("button#restart").click(function(event){
    $("#playWindow").hide();
    changePlayers();
    player1.restart();
    player2.restart();
    $("#roundTotal1").empty();
    $("#totalScore1").empty();
    $("#dieRoll1").empty();
    $("#roundTotal2").empty();
    $("#totalScore2").empty();
    $("#dieRoll2").empty();

    $("#main-window").show();
  });
});
