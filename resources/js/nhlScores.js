/**
 * Created by Darcy Clark on 3/12/2017.
 */

var date = new dateSetter();

function generateNHL(increment) {
    if(increment === 1) {
        date.incrementDate();
    }
    var nhlDataURL = 'https://www.mysportsfeeds.com/api/feed/pull/nhl/current/scoreboard.json?fordate=' + date.writeYYYYMMDD() + '&force=true'
    var nhlScores = new initScores(nhlDataURL);
    nhlScores._loadScores();
    nhlScores._displayScores();
}

generateNHL(0);