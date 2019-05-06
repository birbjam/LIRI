require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
var request = require("request");

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
        console.log(`\n~~~~~~~~~~
        Not a recognized command.
        Type any of the following using the format "node liri <command>":
        concert-this <artist or band>
        spotify-this-song <song and artist or just song>
        movie-this <movie name>
        do-what-it-says <command>
        
        Example command: node liri movie-this arrival
        \n~~~~~~~~~~`);
        break;
}
}

userCommand(userInput, userTerm);


function concertThis() {
    var URL = `https://rest.bandsintown.com/artists/${userTerm}/events?app_id=codingbootcamp`;

    if (!userTerm) {
        userTerm = "jungle"
    };

    console.log(`SEARCHING FOR ${userTerm}`);

    request(URL, function(err, response, body) {

        if (!err && response.statusCode === 200) {
        let artist = JSON.parse(body);

        if (artist.length > 0) {
            for (i = 0; i < 1; i++) {
                
                console.log(`\n~~~~~~~~~~\n
                    Venue Name: ${artist[i].venue.name}
                    Country: ${artist[i].venue.country}
                    City: ${artist[i].venue.city}
                    Date: ${artist[i].datetime}
                    Lineup: ${artist[i].lineup[0]}
                    \n~~~~~~~~~~`);
            };
        } else {
            console.log(`${userTerm} not found!`);
        };

    }
    });
    
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
            console.log(`\n~~~~~~~~~~\n
            Artist: ${data.tracks.items[i].album.artists[0].name}
            Song: ${data.tracks.items[i].name}
            Album: ${data.tracks.items[i].album.name}
            \n~~~~~~~~~~\n
            `)
        }
        //console.log(data);
      }
    );

}

function movieThis() {
    let URL = `http://www.omdbapi.com/?apikey=trilogy&t=${userTerm}`;

    axios.get(URL)
        .then(function (response) {
            var jsonData = response.data;
        console.log(`\n~~~~~~~~~~\n
        Movie Name: ${jsonData.Title}
        Rating: ${jsonData.imdbRating}
        Year: ${jsonData.Year}
        Genre: ${jsonData.Genre}
        Summary: ${jsonData.Plot}
        \n~~~~~~~~~~`);
    })

}

function doThis() {

}

