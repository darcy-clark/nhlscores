/**
 * Created by Darcy Clark on 3/12/2017.
 */

var urlParts= {
    partOne: 'https://www.mysportsfeeds.com/api/feed/pull/nhl/current/scoreboard.json?fordate=',
    partTwo: '&force=true'
};

var nhlScores = new initScores(urlParts);

nhlScores.date.setRewind(3);

nhlScores._generateScoreBar({
    position: 'front',
    amount: 7
});

//This block displays today's scores when the page is first loaded
// var indexToday = nhlScores.getIndexMarker();
// nhlScores._displayScores(indexToday);

console.log(nhlScores.date.getLatest());