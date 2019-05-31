
   

LIRI Bot
The Language Interpretation and Recognition Interface (LIRI) is built for use in Node.js to handle and log searches for concert, song, and movie information, either via the command line or through saved search parameters in random.txt. It's designed in such a way that additional commands can be easily added at any time.
Contents
Dependencies
APIs
Packages
How It Works
Example Searches
Concert Search
Song Search
Movie Search
The do-what-it-says Search
Expandable Design
Logging of Searches
Dependencies
LIRI relies on four packages and three APIs:
APIs
Bandsintown API (For concert info)
Spotify API (For song info)
OMDB API (For movie info)
Packages
Axios (For handling the OMDB and Bandsintown API calls)
Node Spotify API (For handling the Spotify API calls)
FS (For reading data in random.txt and recording search queries in log.txt)
Moment (For displaying concert dates uniformly)
How It Works
Once downloaded, all instructions can be given to LIRI via the command line, after typing node liri.js. There are four basic commands:
concert-this '[Artist]'
spotify-this-song '[Song Title]'
movie-this '[Movie Title]'
do-what-it-says
The string for each artist, song title, or movie title must be surrounded by single or double quotation marks. The do-what-it-says command is a special case in which a command is read from the random.txt file. If a user types in an invalid or incomplete command, LIRI returns an error and provides a list of valid commands:

Example Searches
Concert Search
Here's what a successful concert search looks like:

For each concert an artist has coming up, LIRI returns the venue, city name, country name, and date, broken nicely onto individual lines:

And, if a search returns no concert results or the user provides no artist to search for, LIRI still returns a notification:


Song Search
Here's a successful song search:

For any song the user looks up, LIRI returns the name of the artist, the name of the song, a URL to listen to the song on Spotify, and the name of the album the song appears on:

And, again, if a search returns no result or the user forgets to input a title, LIRI still responds with a notification:


Movie Search
Finally, here's a successful movie search:

For each movie the user looks up, LIRI returns the title, the year of release, the IMDB and Rotten Tomatoes ratings, the country the film was produced in, the languages it's available in, the plot, and the cast.

And, as with searches for artists and songs, LIRI's movie search still provides a notification to the user if no title is provided or if no results are returned.


The do-what-it-says Search
This is a special search currently connected to random.txt, but in the future it could take in outside commands and titles from any local file or fetchable external source. For any string typed into random.txt in the format [command],'[artist, song, or movie]', the do-what-it-says command will read that string and, from there, perform its usual artist, song, or movie search.
The results when random.txt includes spotify-this-song,'I Want It That Way':

The results when random.txt includes concert-this,'Alicia Keys':

The results when random.txt includes movie-this,'A Few Good Men':

Also, if a string is added to random.txt in the wrong way, LIRI still responds with a notification to let the user know the string needs to be cleaned up.

Expandable Design
All commands delivered to LIRI are filtered through a JavaScript switch statement.

A sample of the JavaScript switch statement
Adding new commands to the bot is as easy as coming up with a new command string and an API to sift through for information, from weather reports to game scores to stock market updates.
Logging of Searches
In addition to handling searches via command, LIRI also keeps a log of all successful searches, stored in log.txt. The function built to do this relies on a simple appendFile method from the fs package at the moment, but the idea could be taken further in the near future to track user data or general search trends over time.
