/**
 * Created by Darcy Clark on 3/12/2017.
 */

//var date = new dateSetter();

var nhlScores = new initScores();
for(var count = 0; count < 3; count++) {
    nhlScores.date.decrementDate();
}

nhlScores._generateScoreBar({
    urlPartOne: 'https://www.mysportsfeeds.com/api/feed/pull/nhl/current/scoreboard.json?fordate=',
    urlPartTwo: '&force=true',
    position: 'front',
    amount: 7
});

//generateNHL(7, 'front');
//generateNHL(3, 'front');
//generateNHL(7, 'back');

var indexToday = nhlScores.getIndexMarker();
nhlScores._displayScores(indexToday);
console.log(nhlScores.getScoresArray());

console.log(nhlScores.date.setLatest());
// object list:
// amount
// position (front/back)
// url part 1
// url part 2