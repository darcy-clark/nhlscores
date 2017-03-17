/**
 * Created by Darcy Clark on 3/12/2017.
 */

var date = new dateSetter();

var nhlScores;
function generateNHL(increment) {
    nhlScores = new initScores();
    for(var count = 0; count < 3; count++) {
        date.decrementDate();
    }
    for(var count = 0; count < 7; count++) {
        date.incrementDate();
        var nhlDataURL = 'https://www.mysportsfeeds.com/api/feed/pull/nhl/current/scoreboard.json?fordate=' + date.writeYYYYMMDD() + '&force=true';
        nhlScores._loadScores(nhlDataURL, null);
        console.log(date.writeYYYYMMDD());
        if(date.getTheDay() === date.getToday()) {
            nhlScores.setIndexMarker(count);
        }
    }
    var indexToday = nhlScores.getIndexMarker();
    nhlScores._displayScores(indexToday);
    console.log(nhlScores.getScoresArray());
}

generateNHL(0);