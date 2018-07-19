require("dotenv").config();
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var keys = require("./keys");
var request = require("request");
var fs = require("fs");
var spotify = new Spotify(keys.spotify);
//functions
var action = process.argv[2];
var value = process.argv[3];
// var Twitter = require('twitter');
var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var params = {
    screen_name: 'hellodarling328',
    count: 3
    }
var request = require('request');
var fs = require('fs');

// switch (action) {
//     case 'mytweets':
//         myTweets();
        break;
    // case 'spotify':
    //     spotifyThis(value);
    //     break;
//     case 'omdb':
//         omdbThis(value);
//         break;
//     case 'random':
//         random();
//         break;
// }
// function myTweets() {
//     client.get('statuses/user_timeline', params, function(error, tweets, response) {
//         if (!error && response.statusCode == 200) {
//             fs.appendFile('terminal.log', ('=============== LOG ENTRY BEGIN ===============\r\n' + Date() + '\r\n \r\nTERMINAL COMMANDS:\r\n$: ' + process.argv + '\r\n \r\nDATA OUTPUT:\r\n'), function(err) {
//                 if (err) throw err;
//             });
//             console.log(' ');
//             console.log('Last 3 Tweets:')
//             for (i = 0; i < tweets.length; i++) {
//                 var number = i + 1;
//                 console.log(' ');
//                 console.log([i + 1] + '. ' + tweets[i].text);
//                 console.log('Created on: ' + tweets[i].created_at);
//                 console.log(' ');
//                 fs.appendFile('terminal.log', (number + '. Tweet: ' + tweets[i].text + '\r\nCreated at: ' + tweets[i].created_at + ' \r\n'), function(err) {
//                     if (err) throw err;
//                 });
//             }
//             fs.appendFile('terminal.log', ('=============== LOG ENTRY END ===============\r\n \r\n'), function(err) {
//                 if (err) throw err;
//             });
//         }
//     });
// }
// 
var ArtistNames = function(artist) {
    return artist.name;
  };
  
  // Function for running a Spotify search
  var Spotify = function(songName) {
    if (songName === undefined) {
      songName = "What's my age again";
    }
  
    spotify.search(
      {
        type: "track",
        query: songName
      },
      function(err, data) {
        if (err) {
          console.log("Error occurred: " + err);
          return;
        }
  
        var songs = data.tracks.items;
  
        for (var i = 0; i < songs.length; i++) {
          console.log(i);
          console.log("artist(s): " + songs[i].artists.map(ArtistNames));
          console.log("song name: " + songs[i].name);
          console.log("preview song: " + songs[i].preview_url);
          console.log("album: " + songs[i].album.name);
          console.log("-----------------------------------");
        }
      }
    );
  };
  
  // Function for running a Twitter Search
  var MyTweets = function() {
    var client = new Twitter(keys.twitter);
  
    var params = {
      screen_name: "fox"
    };
    client.get("statuses/user_timeline", params, function(error, tweets, response) {
      if (!error) {
        for (var i = 0; i < tweets.length; i++) {
          console.log(tweets[i].created_at);
          console.log("");
          console.log(tweets[i].text);
        }
      }
    });
  };
  
  // Function for running a Movie Search
  var Movie = function(movieName) {
    if (movieName === undefined) {
      movieName = "Mr Nobody";
    }
  
    var urlHit = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apikey=trilogy";
  
    request(urlHit, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        var jsonData = JSON.parse(body);
  
        console.log("Title: " + jsonData.Title);
        console.log("Year: " + jsonData.Year);
        console.log("Rated: " + jsonData.Rated);
        console.log("IMDB Rating: " + jsonData.imdbRating);
        console.log("Country: " + jsonData.Country);
        console.log("Language: " + jsonData.Language);
        console.log("Plot: " + jsonData.Plot);
        console.log("Actors: " + jsonData.Actors);
        console.log("Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value);
      }
    });
  };
  
  // Function for running a command based on text file
  var jumpMoon = function() {
    fs.readFile("random.txt", "utf8", function(error, data) {
      console.log(data);
      var dataArr = data.split(",");
      if (dataArr.length === 2) {
        pick(dataArr[0], dataArr[1]);
      }
      else if (dataArr.length === 1) {
        pick(dataArr[0]);
      }
    });
  };
  
  var pick = function(caseData, functionData) {
    switch (caseData) {
    case "my-tweets":
      MyTweets();
      break;
    case "spotify-this-song":
      Spotify(functionData);
      break;
    case "movie-this":
      Movie(functionData);
      break;
    case "jump-moon":
      jumpMoon();
      break;
    default:
      console.log("LIRI can't do that!");
    }
  };
  var runThis = function(argOne, argTwo) {
    pick(argOne, argTwo);
  };
  
  // MAIN PROCESS
  runThis(process.argv[2], process.argv[3]);
  