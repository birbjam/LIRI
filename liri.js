require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");


/*Make it so liri.js can take in one of the following commands:

   * `concert-this`

   * `spotify-this-song`

   * `movie-this`

   * `do-what-it-says`
   */

//USE SWITCH ^

//LOOP THRU THE RESULTS OF THE RESULTS

spotify.search({
    type: 'track', query: "All The Small Things" }, function(err, data) {
        if (err) {
            return console.log("error occured: " + err);
        }
        console.log(data);
    }
);