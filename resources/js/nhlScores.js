/**
 * Created by AHA-Admin on 3/12/2017.
 */

var nhlScoreRequest = {
    type: 'GET',
    url: 'https://www.mysportsfeeds.com/api/feed/pull/nhl/current/scoreboard.json?fordate=20170312&force=true',
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

var nhlScores = new initScores(nhlScoreRequest);

console.log(nhlScores.scores.scoreboard.gameScore.length);