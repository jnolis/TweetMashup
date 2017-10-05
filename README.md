# Tweet mashup

The code behind the website tweetmashup.com. Written in F#, using [Tweetinvi](https://github.com/linvi/tweetinvi) for twitter functionality and [Websharper](http://websharper.com) for the web components

## How to run:

  1. Download Visual Studio 2017, be sure to include F# functionality.
  2. Get a Twitter API [app key set](https://apps.twitter.com/).
  2. In the `Website` folder of the repository, create an xml file called `AppSettingsSecrets.config` which will contain the credentials you created in the previous step (see template below).
  3. In the `web.config` file in the website folder, adjust the database connection string to connect to your SQL Server.
  4. Run the create tables sql script in your database to initialize the necessary tables.
  5. Open the project in Visual Studio, build and run it.
  
### Template for AppSettingsSecrets.config

```
<appSettings>  
    <!-- Twitter--> 
   <add key="consumerKey" value="YOUR_CONSUMER_KEY" />
   <add key="consumerSecret" value="YOUR_CONSUMER_SECRET" />
   <add key="accessToken" value="YOUR_ACCESS_TOKEN" />
   <add key="accessTokenSecret" value="YOUR_ACCESS_TOKEN_SECRET" />
</appSettings>
```

## How it makes a mashed up tweet

Suppose we have two tweets we want to mash up. One tweet says: "I don't like to worry about spiders" while the other says "Sometimes I worry that I am a ghost." We can mash the two tweets together by combining them from the word "worry." We take the words to the left of the word "worry" in the first tweet ("I don't like to") and the the words to the right of "worry" in the second tweet ("that I am a ghost") and combine them "I dont like to worry that I am a ghost". Tweet Mashup works by doing this in an efficient manner. In more detail:

  1. For two users do the following:
    1. Download a set their tweets
    2. For each tweet, take each word in the tweet and store how many characters into the tweet it is.
    3. Create a dictionary that has, for each unique word, an array of the tweets and positions the word falls in.
  2. Take the two tweet-word dictionary, and find the words that are in both of them.
  3. Randomly pick a word from the set of words in both dictionaries.
  4. Randomly choose an instance that word shows up in a tweet from each user, and randomly choose which user will be the beginning half of the mashed-up tweet, and which will be the ending half.
  5. Combined these together to make one tweet.
  
I do a little extra work to make sure the combined tweet is at most 140 characters (including the usernames and link to tweetmashup.com). I also do some caching so that each tweet set doesn't have to be downloaded from the Twitter API every time someone wants to mashup a new tweet.

## Why F&#35;

I think that F# is a great functional programming language, and the fact that it uses .NET means you can use popular packages with it (specifically in this case Tweetinvi). Websharper is a great F# package for creating both the front and back end of a website all in F#.