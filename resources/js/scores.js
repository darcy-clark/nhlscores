/**
 * Created by Darcy Clark on 3/9/2017.
 */

//This function initializes the AJAX request parameters with the proper date
function initScores(urlParts) {
    //passThis is necessary to use 'this' in document functions, otherwise 'this' is the not initScore's 'this'
    var passThis = this;
    var scoresArray = [];
    var indexMarker = 0;            //indexMarker keeps tracks of the scoreArray index that _displayScores() must display
    var daysToAdd = 3;
    this.date = new dateSetter();

    //GETTERS AND SETTERS
    //this function may not be necessary if the object reinitializes
    this.resetScoresArray = function () {
        scoresArray = [];
        return scoresArray;
    };
    this.getScoresArray = function () {
        return scoresArray;
    };

    this.getURL = function () {
        return urlParts;
    };

    this.setIndexMarker = function (newIndexMarker) {
        indexMarker = newIndexMarker;
        return indexMarker;
    };
    this.getIndexMarker = function () {
        return indexMarker;
    };

    this.getDaysToAdd = function () {
        return daysToAdd;
    };

    //HTML
    document.getElementById('increment').addEventListener('click', function () {
        passThis._pushDisplay(1);
    });
    document.getElementById('decrement').addEventListener('click', function () {
        passThis._pushDisplay(-1);
    });
}

//loading data is an object containing both parts of the JSON's url, position of the array, and amount to add
initScores.prototype._generateScoreBar = function (loadingData) {
    for(var count = 0; count < loadingData.amount; count++) {
        var urlParts = this.getURL();
        var nhlDataURL = urlParts.partOne + this.date.writeYYYYMMDD() + urlParts.partTwo;
        //position is whether we're adding dates to the beginning of the array or the end; back in time or forward
        this._loadScores(nhlDataURL, loadingData.position);
        console.log(this.date.writeYYYYMMDD());

        //when we get to today's day, set the initial display index to today
        if(this.date.getTheDay() === this.date.getToday()) {
            this.setIndexMarker(count);
            this._displayScores(this.getIndexMarker());
        }

        //if we're adding to the end of the array, up the date and set that as the latest date we have (and vice-versa)
        if(loadingData.position === 'front') {
            this.date.incrementDate();
            this.date.setLatest();
        }
        else {
            this.date.decrementDate();
            this.date.setEarliest();
        }
    }
};

initScores.prototype._loadScores = function (dataURL, position) {
    var scoreRequest = {
        type: 'GET',
        dataType: 'json',
        async: false,
        url: dataURL,
        headers:{
            "Authorization": "Basic " + btoa("cepiolot" + ":" + "jerichoman")
        },
        data: '"comment"'
    };

    var scoresJSON = $.ajax(scoreRequest);
    var scores = JSON.parse(scoresJSON.responseText);
    scores.date = this.date.getTheDate();
    var scoresArray = this.getScoresArray();
    if(position === 'front')
        scoresArray.push(scores);
    else
        scoresArray.unshift(scores);
};

initScores.prototype._displayScores = function (index) {
    var scoreDiv = document.getElementById('scores');
    var scoresArray = this.getScoresArray();
    scoreDiv.innerHTML = '';

    //makes as many scorebox divs as there are games that night
    for(var count = 0; count < scoresArray[index].scoreboard.gameScore.length; count++) {
        var scoreboxDiv = document.createElement('div');
        scoreboxDiv.id = 'game' + count;
        scoreboxDiv.className = 'scorebox';
        scoreDiv.appendChild(scoreboxDiv);

        this._createPs('homeTeam', scoresArray[index].scoreboard.gameScore[count].game.homeTeam.City, scoreboxDiv);
        this._createPs('awayTeam', scoresArray[index].scoreboard.gameScore[count].game.awayTeam.City, scoreboxDiv);
        this._createPs('homeTeam score', scoresArray[index].scoreboard.gameScore[count].homeScore, scoreboxDiv);
        this._createPs('awayTeam score', scoresArray[index].scoreboard.gameScore[count].awayScore, scoreboxDiv);
    }

    //display the date above the scores for the user
    console.log(scoresArray[index].date.month);
    switch(scoresArray[index].date.weekday) {
        case 0:
            document.getElementById('score_date').innerHTML = 'Sunday';
            break;
        case 1:
            document.getElementById('score_date').innerHTML = 'Monday';
            break;
        case 2:
            document.getElementById('score_date').innerHTML = 'Tuesday';
            break;
        case 3:
            document.getElementById('score_date').innerHTML = 'Wednesday';
            break;
        case 4:
            document.getElementById('score_date').innerHTML = 'Thursday';
            break;
        case 5:
            document.getElementById('score_date').innerHTML = 'Friday';
            break;
        case 6:
            document.getElementById('score_date').innerHTML = 'Saturday';
            break;
        default:
            document.getElementById('score_date').innerHTML = 'Error';
            break;
    }
    document.getElementById('score_date').innerHTML += ', <br>';
    switch(scoresArray[index].date.month) {
        case 1:
            document.getElementById('score_date').innerHTML += 'Jan.';
            break;
        case 2:
            document.getElementById('score_date').innerHTML += 'Feb.';
            break;
        case 3:
            document.getElementById('score_date').innerHTML += 'March';
            break;
        case 4:
            document.getElementById('score_date').innerHTML += 'April';
            break;
        case 5:
            document.getElementById('score_date').innerHTML += 'May';
            break;
        case 6:
            document.getElementById('score_date').innerHTML += 'June';
            break;
        case 7:
            document.getElementById('score_date').innerHTML += 'July';
            break;
        case 8:
            document.getElementById('score_date').innerHTML += 'Aug.';
            break;
        case 9:
            document.getElementById('score_date').innerHTML += 'Sept.';
            break;
        case 10:
            document.getElementById('score_date').innerHTML += 'Oct.';
            break;
        case 11:
            document.getElementById('score_date').innerHTML += 'Nov.';
            break;
        case 12:
            document.getElementById('score_date').innerHTML += 'Dec.';
            break;
        default:
            document.getElementById('score_date').innerHTML = 'Error';
            break;
    }
    document.getElementById('score_date').innerHTML += ' ' + scoresArray[index].date.day + ', ' + scoresArray[index].date.year;
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
    var daysToAdd = this.getDaysToAdd();

    if(direction === 1)
        currentIndex = this.setIndexMarker(currentIndex + 1);
    else
        currentIndex = this.setIndexMarker(currentIndex - 1);

    // when we reach the end of the array indexing the stored days' scores, make an AJAX request for more days
    if(this.getIndexMarker() === scoresArray.length) {
        //jump to the latest date that must be displayed, in case the user went back in time, generated scores from
        //back then, and then went forward to generate more scores in the future
        var latestDate = this.date.getLatest();
        this.date.setTheDate(latestDate);
        this._generateScoreBar({
            position: 'front',
            amount: daysToAdd
        });
    }
    else if(this.getIndexMarker() === -1) {
        var earliestDate = this.date.getEarliest();
        this.date.setTheDate(earliestDate);
        this._generateScoreBar({
            position: 'back',
            amount: daysToAdd
        });
        currentIndex = this.setIndexMarker(daysToAdd - 1);  //index is -1, must be set to the proper score date
    }
    this._displayScores(currentIndex);
};

function dateSetter() {
    var date = new Date();

    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var dayOfWeek = date.getDay();

    //remains static as the current date, while the other year/month/day values change as they are manipulated
    var today = {
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear()
    };

    //one day after the latest date we are able to display, and vice-versa for earliestDate
    var latestDate = {};
    var earliestDate= {};

    this.daysInMonth = function () {
        return new Date(year, month, 0).getDate();
    };

    function daysInLastMonth() {
        return new Date(year, month - 1, 0).getDate();
    }

    //writes the date in the proper format for MySportsFeeds to handle in the AJAX request
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

        switch(dayOfWeek) {
            case 6:
                dayOfWeek = 0;
                break;
            default:
                dayOfWeek++;
                break;
        }
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

        switch(dayOfWeek) {
            case 0:
                dayOfWeek = 6;
                break;
            default:
                dayOfWeek--;
                break;
        }
    };

    this.setRewind = function (daysRewind) {
        //rewind must go back one more than the daysRewind counter in order to setEarliest() as a day before the
        // earliest date displayable
        for(var count = 0; count < daysRewind + 1; count++)
            this.decrementDate();
        this.setEarliest();     //set the earliest date after the full rewind
        this.incrementDate();
    };

    //GETTERS AND SETTERS
    this.getToday = function () {
        return String(today.day) + String(today.month) + String(today.year);
    };

    this.getTheDay = function () {
        return String(day) + String(month) + String(year);
    };

    this.getLatest = function () {
        return latestDate;
    };

    this.getEarliest = function () {
        return earliestDate;
    };

    this.getDayOfWeek = function () {
        return dayOfWeek;
    };

    this.getTheDate = function () {
        var dateObject = {
            day: day,
            month: month,
            year: year,
            weekday: dayOfWeek
        };
        return dateObject;
    };

    this.setLatest = function () {
          latestDate.day = day;
          latestDate.month = month;
          latestDate.year = year;
          return latestDate;
    };

    this.setEarliest = function () {
        earliestDate.day = day;
        earliestDate.month = month;
        earliestDate.year = year;
        return earliestDate;
    };

    this.setTheDate = function (newDate) {
        day = newDate.day;
        month = newDate.month;
        year = newDate.year;
    };
}