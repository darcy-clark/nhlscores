/**
 * Created by Darcy Clark on 3/9/2017.
 */

function initScores(dataURL) {
    var scoreRequest = {
        type: 'GET',
        dataType: 'json',
        async: false,
        headers:{
            "Authorization": "Basic " + btoa("cepiolot" + ":" + "jerichoman")
        },
        data: '"comment"',
        success: function (){
            console.log('Data Received');
        }
    };
    scoreRequest.url = dataURL;

    this.getScoreRequest = function () {
        return scoreRequest;
    };
}

initScores.prototype._loadScores = function () {
    var scoreRequest = this.getScoreRequest();
    var scoresJSON = $.ajax(scoreRequest);
    this.scores = JSON.parse(scoresJSON.responseText);
    //var scoreDiv = document.getElementById('scores');
    console.log(this.scores.scoreboard.gameScore.length);
};

initScores.prototype._displayScores = function () {
    var scoreDiv = document.getElementById('scores');
    scoreDiv.innerHTML = '';
    for(var count = 0; count < this.scores.scoreboard.gameScore.length; count++) {
        var scoreboxDiv = document.createElement('div');
        scoreboxDiv.id = 'game' + count;
        scoreboxDiv.className = 'scorebox';
        scoreDiv.insertBefore(scoreboxDiv, null);

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

function dateSetter() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();

    function daysInMonth() {
        return new Date(year, month, 0).getDate();
    }

    this.writeYYYYMMDD = function () {
        var YYYYMMDD = String(year);
        if(month < 10)
            YYYYMMDD += '0' + month;
        else
            YYYYMMDD += month;
        if(day < 10)
            YYYYMMDD += '0' + day;
        else
            YYYYMMDD += day;
        return YYYYMMDD;
    };

    this.incrementDate = function () {
        if(month === 12 && daysInMonth() === day) {
            day = 1;
            month = 1;
            year++;
        }
        else if(daysInMonth() === day) {
            day = 1;
            month++;
        }
        else
            day++;
    };
}