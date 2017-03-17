/**
 * Created by Darcy Clark on 3/9/2017.
 */

//This function initializes the AJAX request parameters with the proper date
function initScores() {
    var passThis = this;
    var scoresArray = [];
    //this function may not be necessary if the object reinitializes
    this.resetScoresArray = function () {
        scoresArray = [];
        return scoresArray;
    };
    this.getScoresArray = function () {
        return scoresArray;
    }

    var indexMarker = 0;
    this.setIndexMarker = function (newIndexMarker) {
        indexMarker = newIndexMarker;
        return indexMarker;
    };
    this.getIndexMarker = function () {
        return indexMarker;
    };
    document.getElementById('increment').addEventListener('click', function () {
        passThis._pushDisplay(1);
    });
    document.getElementById('decrement').addEventListener('click', function () {
        passThis._pushDisplay(-1);
    });
}

initScores.prototype._loadScores = function (dataURL, day) { //day should likely by in display, not load
    var scoreRequest = {
        type: 'GET',
        dataType: 'json',
        async: false,
        url: dataURL,
        headers:{
            "Authorization": "Basic " + btoa("cepiolot" + ":" + "jerichoman")
        },
        data: '"comment"',
        // success: function (){
        //     console.log('Data Received');
        // }
    };

    var scoresJSON = $.ajax(scoreRequest);
    var scores = JSON.parse(scoresJSON.responseText);
    var scoresArray = this.getScoresArray();
    scoresArray.push(scores);
};

initScores.prototype._displayScores = function (index) {
    var scoreDiv = document.getElementById('scores');
    var scoresArray = this.getScoresArray();
    console.log(scoresArray[0]);
    scoreDiv.innerHTML = '';
    for(var count = 0; count < scoresArray[index].scoreboard.gameScore.length; count++) {
        var scoreboxDiv = document.createElement('div');
        scoreboxDiv.id = 'game' + count;
        scoreboxDiv.className = 'scorebox';
        scoreDiv.appendChild(scoreboxDiv);

        console.log(scoreboxDiv);

        this._createPs('homeTeam', scoresArray[index].scoreboard.gameScore[count].game.homeTeam.City, scoreboxDiv);
        this._createPs('awayTeam', scoresArray[index].scoreboard.gameScore[count].game.awayTeam.City, scoreboxDiv);
        this._createPs('homeTeam score', scoresArray[index].scoreboard.gameScore[count].homeScore, scoreboxDiv);
        this._createPs('awayTeam score', scoresArray[index].scoreboard.gameScore[count].awayScore, scoreboxDiv);
    }
};

initScores.prototype._createPs = function (htmlClass, property, miniDiv) {
    var scoreP = document.createElement('p');
    scoreP.className = htmlClass;
    miniDiv.appendChild(scoreP);
    var scoreText = document.createTextNode(property);
    scoreP.appendChild(scoreText);
};

initScores.prototype._pushDisplay = function (direction) {
    var scoresArray = this.getScoresArray();
    var currentIndex = this.getIndexMarker();

    if(direction === 1)
        currentIndex = this.setIndexMarker(currentIndex + 1);
    else
        currentIndex = this.setIndexMarker(currentIndex - 1);
    if(this.getIndexMarker() === scoresArray.length) {

    }
    else {

    }
    this._displayScores(currentIndex);
};

function dateSetter() {
    var date = new Date();
    //date.setDate(date.getDate() - 5);

    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var today = date.getDate();

    this.daysInMonth = function () {
        return new Date(year, month, 0).getDate();
    };

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
        if(month === 12 && this.daysInMonth() === day) {
            day = 1;
            month = 1;
            year++;
        }
        else if(this.daysInMonth() === day) {
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

    this.getToday = function () {
        return today;
    }

    this.getTheDay = function () {
        return day;
    }
}