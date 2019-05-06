require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");

let userInput = process.argv[2];
let userTerm = process.argv.slice[3].join(" ");

function userCommand(userInput, userTerm) {
switch (command) {
    case 'concert-this':
        concertThis();
        break;
    case 'spotify-this-song':
        spoitifyThisSong();
        break;
    case 'movie-this':
        movieThis();
        break;
    case 'do-what-it-says':
        doThis(userTerm);
        break;
    default:
        console.log('Not a recognized command');
        break;
}
}

userCommand(userInput, userTerm);

//LOOP THRU THE RESULTS OF THE RESULTS

spotify.search({
    type: 'track', query: "All The Small Things" }, function(err, data) {
        if (err) {
            return console.log("error occured: " + err);
        }
        console.log(data);
    }
);