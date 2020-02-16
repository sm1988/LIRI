require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);
var fs = require("fs");
var axios = require("axios");
var moment = require("moment");

var userInput2 = process.argv[2];
var userInput3 = process.argv[3];

switch (userInput2) {
    case "concert-this":
        var artist = userInput3;
        var reqURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
        axios.get(reqURL).then(
            function (response) {
                console.log("--------------------------------------");
                console.log("Upcoming Events By " + artist);
                response.data.forEach(element => {
                    console.log("--------------------------------------");
                    console.log("Venue : " + element.venue.name);
                    console.log("Location : " + element.venue.country);
                    console.log("Date : " + moment(element.datetime).format("MM/DD/YYYY"));
                });
            })
            .catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log("---------------Data---------------");
                    console.log(error.response.data);
                    console.log("---------------Status---------------");
                    console.log(error.response.status);
                    console.log("---------------Status---------------");
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an object that comes back with details pertaining to the error that occurred.
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log("Error", error.message);
                }
                console.log(error.config);
            });
        break;
    case "spotify-this-song":
        var song = userInput3;
        var reqURL = "https://api.spotify.com/v1/search?q=" + song + "&type=track&market=US";
        spotify
            .request(reqURL)

            .then(function (data) {
                //console.log(data.tracks.items[0]);
                console.log("-----------------------");
                console.log("Name : " + data.tracks.items[0].name);
                console.log("Artist(s) : " + data.tracks.items[0].artists[0].name);
                console.log("Album : " + data.tracks.items[0].album.name);
                console.log("Preview URL : " + data.tracks.items[0].preview_url);
                console.log("-----------------------");

            })
            .catch(function (err) {
                console.error('Error occurred: ' + err);
            });
        break;
    case "movie-this":
        var queryUrl = "http://www.omdbapi.com/?t=" + userInput3 + "&y=&plot=short&apikey=trilogy";

        axios.get(queryUrl).then(
            function (response) {
                console.log("Title: " + response.data.Title);
                console.log("Year Released: " + response.data.Year);
                console.log("IMDB Rating: " + response.data.imdbRating);
                console.log("Rotten Tomatoes Rating: " + response.data.Ratings["Rotten Tomatoes"]);
                console.log("Country: " + response.data.Country);
                console.log("Language: " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);
                console.log("The movie's rating is: " + response.data.imdbRating);
            })
            .catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log("---------------Data---------------");
                    console.log(error.response.data);
                    console.log("---------------Status---------------");
                    console.log(error.response.status);
                    console.log("---------------Status---------------");
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an object that comes back with details pertaining to the error that occurred.
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log("Error", error.message);
                }
                console.log(error.config);
            });

        break;
    case "do-what-it-says":
        // The code will store the contents of the reading inside the variable "data"
        fs.readFile("random.txt", "utf8", function (error, data) {

            // If the code experiences any errors it will log the error to the console.
            if (error) {
                return console.log(error);
            }
            // Then split it by commas (to make it more readable)
            var dataArr = data.split(",");
            var song = dataArr[1].split(" ");
            var reqURL = "https://api.spotify.com/v1/search?q=" + song + "&type=track&market=US";
            spotify
                .request(reqURL)

                .then(function (data) {
                    //console.log(data.tracks.items[0]);
                    console.log("-----------------------");
                    console.log("Name : " + data.tracks.items[0].name);
                    console.log("Artist(s) : " + data.tracks.items[0].artists[0].name);
                    console.log("Album : " + data.tracks.items[0].album.name);
                    console.log("Preview URL : " + data.tracks.items[0].preview_url);
                    console.log("-----------------------");
                })
                .catch(function (err) {
                    console.error('Error occurred: ' + err);
                });


        });
        break;
    default:
        console.log("Please provide a valid input!");
    //
}

