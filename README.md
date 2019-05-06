# LIRI
## Language Interpretation and Recognition Interface.

- A command line node application that takes in user parameters and gives back data from Spotify, OMDB and Bands In Town.
- If no command is run, a message pops up guiding the user through the basic functions.

- The app utilizes four basic funtions:
1. The `movie-this` command takes in a movie title and returns data from OMBD about the movie such as title, year of release, ratings, country of production, language, genre, cast and summary. If no movie title is specified, the command will automatically run the movie Arrival.

2. The `spotify-this-song` command takes in a song and artist or just a song and returns data from Spotify that includes the artist name, song name, album the song can be found on and a song preview link which links to Spotify. If no song title is specified, the command will automatically run the song Happy Man by Jungle.

3. The `concert-this` command takes in a band name and returns data from Bands in Town about the next concert by that artist, including the artist name, venue name, country and city the venue is located in, as well as the date and time of the concert. If no artist is specified, the command will automatically run the upcoming concert for Jungle.

![LIRI-concert](https://i.makeagif.com/media/5-06-2019/KOytJ8.gif)

4. The `do-this` command is run by itself. It uses the text in the `random.txt` file as a command to return data for whatever the text says. In this case the contents of the `random.txt` file will be `spotify-this-song,"I Want It That Way"`.

## Video Demo
[LIRI Video Demo](https://drive.google.com/file/d/1-PPFYLio3MNlj8gOBeAZavzyDF7D_8RO/view?usp=sharing)

## Built With
- node.js
- JavaScript
- Spotify API
- OMDB API
- Bands In Town API

## License
- GNU GENERAL PUBLIC LICENSE