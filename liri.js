require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");



switch (command) {
    case 'concert-this':
    break;
    case 'spotify-this-song':
    break;
    case 'movie-this':
    break;
    case 'do-what-it-says':
    break;
    default:
        console.log('Not a recognized command')
}

//LOOP THRU THE RESULTS OF THE RESULTS

spotify.search({
    type: 'track', query: "All The Small Things" }, function(err, data) {
        if (err) {
            return console.log("error occured: " + err);
        }
        console.log(data);
    }
);