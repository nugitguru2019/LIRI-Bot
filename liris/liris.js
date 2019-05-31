/* Initial required variables */

require('dotenv').config();

const keys = require('../keys');

const axios = require('axios');

const Spotify = require('node-spotify-api');

const fs = require('fs');

const moment = require('moment');
let inq = require('inquirer');


/* API Key Variables */

const spotify = new Spotify(keys.spotify);

const omdbKey = 'trilogy';

const bandsInTownKey = 'codingbootcamp';



/* Command Line Input Variables */



const cmd = process.argv[2];

const name = process.argv[3];

/* API Call Functions */



function bandCall(bandName) {

    axios.get(`https://rest.bandsintown.com/artists/${bandName}/events?app_id=${bandsInTownKey}`).then(function(response) {



        const concertResults = response.data;



        if(concertResults.length === 0) {

            console.log(`\nSorry, there are no upcoming shows for ${bandName}.\n`);

        } else {



            let eventCount = 1;

            console.log(`\nHere's a list of upcoming show venues and dates for ${bandName}. Buy yourself some tickets!\n`);



            concertResults.forEach(function(concert) {

                console.log(`${eventCount}.`);

                console.log(`Venue: ${concert.venue.name}`);

                if(concert.venue.region) {

                    console.log(`City: ${concert.venue.city}, ${concert.venue.region}\nCountry: ${concert.venue.country}`);

                } else {

                    console.log(`City: ${concert.venue.city}\nCountry: ${concert.venue.country}`);

                }

                const unparsedDate = moment(concert.datetime.split('T')[0], 'YYYY-MM-DD');

                console.log(`Date: ${unparsedDate.format('MM/DD/YYYY')}\n`);

                eventCount ++;

            })  

        }

        

    }).catch(function(err) {

        console.log(err);

    });

}



function spotifyCall(songName) {

    spotify.search({type: 'track', query: songName, limit: 1}, function(err, response) {



        if (err) {

            console.log(`Error occurred: ${err}`);

        }



        if(response.tracks.items.length > 0) {

            console.log(`\nThanks for asking! Here's a little info about that song.\n`);

            console.log(`Artist: ${response.tracks.items[0].album.artists[0].name}`);

            console.log(`Song: ${response.tracks.items[0].name}`);

            console.log(`Link: ${response.tracks.items[0].external_urls.spotify}`);

            console.log(`Album: ${response.tracks.items[0].album.name}\n`);

        } else {

            console.log(`\nSong not found!\n`);

        }



    });

}



function omdbCall(movieName) {

    axios.get(`http://www.omdbapi.com/?apikey=${omdbKey}&t=${movieName}`).then(function(response){



        const movieInfo = response.data;



        if(!movieInfo.Title) {

            console.log(`\n${response.data.Error}\n`);

        } else {

            console.log(`\nThanks for asking! Here's a little info about that movie.\n`);

            console.log(`Title: ${movieInfo.Title}`);

            console.log(`Release year: ${movieInfo.Year}`);

            console.log(`IMDB rating: ${movieInfo.Ratings[0].Value}`);

            console.log(`Rotten Tomatoes rating: ${movieInfo.Ratings[1].Value}`);

            console.log(`Produced in: ${movieInfo.Country}`);

            console.log(`Language(s): ${movieInfo.Language}`);

            console.log(`Plot: ${movieInfo.Plot}`);

            console.log(`Cast: ${movieInfo.Actors}\n`);

        }



    });

}



function logSearch() {

    fs.appendFile(`log.txt`, `${cmd}, ${name}\n`, (err) => {

        if (err) {

            throw err;

        }

        console.log('\nSearch request logged.');

    });

}



/* Switch Function (To Handle Various Commands) */



switch(cmd) {

    case 'concert-this':

        if(name) {

            logSearch();

            bandCall(name);

        } else {

            console.log(`\nNo artist provided. Please make sure you include an artist in quotes after the "concert-this" command.\n`);

        }

        break;

    case 'spotify-this-song':

        if(name) {

            logSearch();

            spotifyCall(name);

        } else {

            console.log(`\nDid you forget to include a song? How about some Ace of Base?`);

            spotifyCall('Ace of Base');

        }

        break;

    case 'movie-this':

        if(name) {

            logSearch();

            omdbCall(name);

        } else {

            console.log(`\nDid you forget to include a movie title? May we suggest "Mr. Nobody"? It's on Netflix!`);

            omdbCall('Mr. Nobody');

        }

        break;

    case 'do-what-it-says':

        fs.readFile('random.txt', 'utf8', function(err, data) {



            if(err) {

                console.log(`Error occurred: ${err}`);

            }



            const outsideCmd = data.split(',')[0];

            const outsideName = data.split(',')[1].split('"')[1];



            function logOutsideSearch() {

                fs.appendFile(`log.txt`, `do-what-it says, ${outsideCmd}, ${outsideName}\n`, (err) => {

                    if (err) {

                        throw err;

                    }

                    console.log('\nSearch request logged.');

                });

            }



            switch(outsideCmd) {

                case 'concert-this':

                    console.log(`\nChecking outside file. It's asking for show venues and times for ${outsideName}. Here are the results.`);

                    logOutsideSearch();

                    bandCall(outsideName);

                    break;

                case 'spotify-this-song':

                    console.log(`\nChecking outside file. It's asking for song information. Here are the results.`);

                    logOutsideSearch();

                    spotifyCall(outsideName);

                    break;

                case 'movie-this':

                    console.log(`\nChecking outside file. It's asking for movie information. Here are the results.`);

                    logOutsideSearch();

                    omdbCall(outsideName);

                    break;

                default:

                    console.log(`\nSorry, the instructions in the outside file may be formatted incorrectly.\n`);

                    break;

            }

        })

        break;

    default:

        console.log(`\nSorry, that's not a valid command. Please enter one of the following valid commands after "liri.js":\n\n1. concert-this "Artist"\n2. spotify-this-song "Song Title"\n3. movie-this "Film Title"\n4. do-what-it-says (Make sure to include appropriate instructions for this one in the "random.txt" file.)\n`);

        break;

}

