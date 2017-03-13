/**
 * Created by Darcy Clark on 3/9/2017.
 */

function initScores(requestData) {
    this.scoresJSON = $.ajax(requestData);
    this.scores = JSON.parse(this.scoresJSON.responseText);
    //this.displayScores = [];
    this.scoreDiv = document.getElementById('scores');
    console.log(this.scores.scoreboard.gameScore.length);
}

initScores.prototype._loadScores = function () {
    this.displayScores = [];
    for(var count = 0; count < this.scores.scoreboard.gameScore.length; count++) {
        this.displayScores.push(document.createElement("div"));
        this.displayScores[count].id = 'game' + count;
        this.displayScores[count].className = 'scorebox';
        this.scoreDiv.insertBefore(nhlScores.displayScores[count], null);
    }
};