/**
 * Created by Darcy Clark on 3/9/2017.
 */

function initScores(requestData) {
    this.scoresJSON = $.ajax(requestData);
    this.scores = JSON.parse(this.scoresJSON.responseText);
}