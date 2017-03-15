/**
 * Created by Darcy Clark on 3/12/2017.
 */

var date = new dateSetter();

function generateNHL(increment) {
    switch(increment) {
        case -1:
            date.decrementDate();
            break;
        case 1:
            date.incrementDate();
            break;
    }
    var nhlDataURL = 'https://www.mysportsfeeds.com/api/feed/pull/nhl/current/scoreboard.json?fordate=' + date.writeYYYYMMDD() + '&force=true'
    var nhlScores = new initScores(nhlDataURL);
    nhlScores._loadScores();
    nhlScores._displayScores();
}

generateNHL(0);