/**
 * Created by Darcy Clark on 3/9/2017.
 */

function initScores(requestData) {
    this.scoresJSON = $.ajax(requestData);
    this.scores = JSON.parse(this.scoresJSON.responseText);
    this.scoreDiv = document.getElementById('scores');
    console.log(this.scores.scoreboard.gameScore.length);
}

initScores.prototype._loadScores = function () {
    for(var count = 0; count < this.scores.scoreboard.gameScore.length; count++) {
        var scoreboxDiv = document.createElement('div');
        scoreboxDiv.id = 'game' + count;
        scoreboxDiv.className = 'scorebox';
        this.scoreDiv.insertBefore(scoreboxDiv, null);

        console.log(scoreboxDiv);

        var homeTeamP = document.createElement('p');
        homeTeamP.className = 'homeTeam';
        scoreboxDiv.appendChild(homeTeamP);
        var homeTeamText = document.createTextNode(this.scores.scoreboard.gameScore[count].game.homeTeam.City);
        homeTeamP.appendChild(homeTeamText);

        var awayTeamP = document.createElement('p');
        awayTeamP.className = 'awayTeam';
        scoreboxDiv.appendChild(awayTeamP);
        var awayTeamText = document.createTextNode(this.scores.scoreboard.gameScore[count].game.awayTeam.City);
        awayTeamP.appendChild(awayTeamText);
    }
};