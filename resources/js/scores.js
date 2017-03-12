/**
 * Created by Darcy Clark on 3/9/2017.
 */

function initScores(requestData) {
    this.scoresJSON = $.ajax(requestData);
    this.scores = JSON.parse(this.scoresJSON.responseText);
    this.displayScores = [];
    this.scoreDiv = document.getElementById('scores');
    console.log(this.scores.scoreboard.gameScore.length);
}