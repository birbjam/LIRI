require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var bandsInTown = keys.bandsInTown;
var omdb = keys.omdb;
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");

let userInput = process.argv[2];
let userTerm = process.argv.slice(3).join(" ");

function userCommand(userInput, userTerm) {
switch (userInput) {
    case 'concert-this':
        concertThis();
        break;
    case 'spotify-this-song':
        spotifyThisSong();
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

function concertThis() {
    var URL = `https://rest.bandsintown.com/artists/${userTerm}/events?app_id=${bandsInTown}`;
    
}

function spotifyThisSong () {
    spotify.search(
      {
        type: "track",
        query: userTerm
      },
      function(err, data) {
        if (err) {
          return console.log("error occured: " + err);
        }
        console.log(data);
      }
    );

}

function movieThis() {
    var URL = `http://www.omdbapi.com/?apikey=${omdb}&t=${userTerm}`;

}

function doThis() {

}

