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
        scoreDiv.appendChild(scoreboxDiv);

        console.log(scoreboxDiv);

        this._createPs('homeTeam', this.scores.scoreboard.gameScore[count].game.homeTeam.City, scoreboxDiv);
        this._createPs('awayTeam', this.scores.scoreboard.gameScore[count].game.awayTeam.City, scoreboxDiv);
        this._createPs('homeTeam score', this.scores.scoreboard.gameScore[count].homeScore, scoreboxDiv);
        this._createPs('awayTeam score', this.scores.scoreboard.gameScore[count].awayScore, scoreboxDiv);
    }
};

initScores.prototype._createPs = function (htmlClass, property, miniDiv) {
    var scoreP = document.createElement('p');
    scoreP.className = htmlClass;
    miniDiv.appendChild(scoreP);
    var scoreText = document.createTextNode(property);
    scoreP.appendChild(scoreText);
};

function dateSetter() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();

    function daysInMonth() {
        return new Date(year, month, 0).getDate();
    }

    function daysInLastMonth() {
        return new Date(year, month - 1, 0).getDate();
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

    this.decrementDate = function () {
        if(month === 1 && day === 1) {
            day = 31;
            month = 12;
            year--;
        }
        else if(day === 1) {
            day = daysInLastMonth();
            month--;
        }
        else
            day--;
    }
}