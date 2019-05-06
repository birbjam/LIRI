require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var OMDB = require("omdb");
//var omdb = new OMDB(keys.omdb);
var bandsInTown = keys.bandsInTown;
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
    if (!userTerm) {
        userTerm = "happy man jungle"
    };

    spotify.search(
      {
        type: "track",
        query: userTerm,
        limit: 1
      },

      function(err, data) {
        if (err) {
          return console.log("Error occured: " + err);
        }

        let spotifyArray = data.tracks.items;

        for (i = 0; i < spotifyArray.length; i++) {
            console.log(`\n RESULTS:\n\n
            Artist: ${data.tracks.items[i].album.artists[0].name}\n
            Song: ${data.tracks.items[i].name}\n
            Albums: ${data.tracks.items[i].album.name}\n\n------------
            `)
        }
        //console.log(data);
      }
    );

}

function movieThis() {
    //axios.get(`http://www.omdbapi.com/?apikey=${omdbKey}&t=${userTerm}`)
    //.then(function (response) {
        //console.log(`
        //Movie Name: ${response.data.name}
        //The movie's rating is: ${response.data.imdbRating}
        //`)
    //})

    omdb.search(userTerm, function(err, movies) {
        if (err) {
            return console.error(err);
        }

        if (movies.length < 1) {
            return console.log('No movies were found!');
        }

        movies.forEach(function(movie) {
            console.log('%s (%d)', movie.title, movie.year);
        });
    });

}

function doThis() {

}

