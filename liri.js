require("dotenv").config();
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

switch (action) {
    case 'mytweets':
        myTweets();
        break;
    // case 'spotify':
    //     spotifyThis(value);
    //     break;
    case 'omdb':
        omdbThis(value);
        break;
    case 'random':
        random();
        break;
}
function myTweets() {
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error && response.statusCode == 200) {
            fs.appendFile('terminal.log', ('=============== LOG ENTRY BEGIN ===============\r\n' + Date() + '\r\n \r\nTERMINAL COMMANDS:\r\n$: ' + process.argv + '\r\n \r\nDATA OUTPUT:\r\n'), function(err) {
                if (err) throw err;
            });
            console.log(' ');
            console.log('Last 3 Tweets:')
            for (i = 0; i < tweets.length; i++) {
                var number = i + 1;
                console.log(' ');
                console.log([i + 1] + '. ' + tweets[i].text);
                console.log('Created on: ' + tweets[i].created_at);
                console.log(' ');
                fs.appendFile('terminal.log', (number + '. Tweet: ' + tweets[i].text + '\r\nCreated at: ' + tweets[i].created_at + ' \r\n'), function(err) {
                    if (err) throw err;
                });
            }
            fs.appendFile('terminal.log', ('=============== LOG ENTRY END ===============\r\n \r\n'), function(err) {
                if (err) throw err;
            });
        }
    });
}