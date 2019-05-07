require("dotenv").config();
// Importing keys from keys.js file.
var keys = require("./keys.js");
// Requiring the npm spotify packages.
var Spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
var request = require("request");
// Creating a new spotify class using the keys and storing it in a variable.
var spotify = new Spotify(keys.spotify);

// Storing user input command in a variable.
let userInput = process.argv[2];
// Storing the search term in a variable.
let userTerm = process.argv.slice(3).join(" ");

// Setting up a function which uses switch and takes two parameters: 
// user input (ie. concert-this) and user term (ie. the search item).
function userCommand(userInput, userTerm) {
switch (userInput) {
  case "concert-this":
    // Calls the concertThis function.
    concertThis();
    break;
  case "spotify-this-song":
    // Calls the spotifyThisSong function.
    spotifyThisSong();
    break;
  case "movie-this":
    // Calls the movieThis function.
    movieThis();
    break;
  case "do-this":
    // Calls the doThis function which takes a parameter of user search term.
    doThis(userTerm);
    break;
// If no command or invalid command is used, pops up with a helpful message.
  default:
    console.log(`\n~~~~~~~~~~
        Not a recognized command.
        Type any of the following using the format "node liri <command>":
        concert-this <artist or band>
        spotify-this-song <song and artist or just song>
        movie-this <movie name>
        do-this <command>
        
        Example command: node liri movie-this inception
        \n~~~~~~~~~~`);
    break;
}
}

// Calls on the user command function to start making queries.
userCommand(userInput, userTerm);

// Defining the concert search function.
function concertThis() {
    // Stores the query url in a variable for convenience.
    var URL = `https://rest.bandsintown.com/artists/${userTerm}/events?app_id=codingbootcamp`;

    // If there is no search term input by the user, defaults to searching for the
    // band Jungle's next upcoming concert.
    if (!userTerm) {
        userTerm = "jungle"
    };

    console.log(`Searching for: ${userTerm}'s next concert!`);

    // Using the request npm package and the api url variable to fetch data 
    //from the bands in town api.
    request(URL, function(err, response, body) {

        // Error handling.
        if (!err && response.statusCode === 200) {
        // If no errors, parses the objects returned into an array so that bits
        // of data can be accessed.
        let artist = JSON.parse(body);

        // Loops through the array of parsed objects using a for loop.
        if (artist.length > 0) {
            for (i = 0; i < 1; i++) {
                
                // Uses moment.js to format the date and time of the data response
                // (ie. the date and time of the concert)
                let dateAndTime = moment(artist[i].datetime).format("MM/DD/YYYY hh:00 A");
                
                // Displays the data of the next concert for the desired band.
                console.log(`
                    \n~~~~~~~~~~\n
                    Artist: ${artist[i].lineup[0]}
                    Venue Name: ${artist[i].venue.name}
                    Country: ${artist[i].venue.country}
                    City: ${artist[i].venue.city}
                    Date and Time: ${dateAndTime}
                    \n~~~~~~~~~~`);
            };
        } else {
            // An else statement in case no concerts for a particular band exist.
            console.log(`No concerts for ${userTerm} found!`);
        };

    }
    });
    
}

// Setting up the spotify function.
function spotifyThisSong () {
    // If no search term is input by the user, defaults to the song
    // "Happy Man" by Jungle and fetches that data from the spotify api.
    if (!userTerm) {
        userTerm = "happy man jungle"
    };

    // Searches for the desired track and displays one item.
    spotify.search(
      {
        type: "track",
        query: userTerm,
        limit: 1
      },

      // Sets up error handling.
      function(err, data) {
        if (err) {
          return console.log("Error occured: " + err);
        }

        // Track array stored in a variable.
        let spotifyArray = data.tracks.items;

        //For loop looping through the array
        for (i = 0; i < spotifyArray.length; i++) {

            // Displays the requested data for a particular song.
            console.log(`\n~~~~~~~~~~\n
            Artist: ${data.tracks.items[i].album.artists[0].name}
            Song: ${data.tracks.items[i].name}
            Album: ${data.tracks.items[i].album.name}
            Song Preview: ${data.tracks.items[i].external_urls.spotify}
            \n~~~~~~~~~~\n
            `)
        }
      }
    );

}


//Sets up movie search function
function movieThis() {
  // Stores the query url in a variable.
  let URL = `http://www.omdbapi.com/?apikey=trilogy&t=${userTerm}`;

  // If no search term entered, defaults to searching for the movie Arrival.
  if (!userTerm) {
    userTerm = "arrival";
  }

  // Fetches the query url.
  axios.get(URL)
  .then(function(response) {
      // Stores response in a variable
    var jsonData = response.data;

    // Displays the desired data.
    console.log(`\n~~~~~~~~~~\n
        Movie Title: ${jsonData.Title}
        Year: ${jsonData.Year}
        IMDB Rating: ${jsonData.imdbRating}
        Rotten Tomatoes Rating: ${jsonData.Ratings[1].Value}
        Country: ${jsonData.Country}
        Language: ${jsonData.Language}
        Genre: ${jsonData.Genre}
        Cast: ${jsonData.Actors}
        Summary: ${jsonData.Plot}
        \n~~~~~~~~~~`);
  });
}

// Sets up the do this function.
function doThis() {
    //Reads the file in utf-8 format.
    fs.readFile('random.txt', 'utf8', function (err, data) {
        // Handles errors.
        if (err) {
            return console.log(err) };
        
        // Stores the contents of the txt file in a variable and makes it into an array,
        // splitting it by a comma.
        let contentsArray = data.split(",");

        // First item of the array becomes the user input.
        userInput = contentsArray[0];
        // Second item of the array becomes the search item
        userTerm = contentsArray[1];
        // Calls on the user command function to do the query using the 
        //contents of the txt file.
        userCommand(userInput, userTerm);
    });
}
