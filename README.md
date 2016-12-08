# Tweet mashup

The code behind the website tweetmashup.com. Written in F#, using [Tweetinvi](https://github.com/linvi/tweetinvi) for twitter functionality and [Websharper](http://websharper.com) for the web components

How to run:

  1. Download Visual Studio 2015, be sure to include F# functionality
  2. Get a Twitter API [app key set](https://apps.twitter.com/).
  2. In the `Website` folder of the repository, create an xml file called AppSettingsSecrets.config which will contain the credentials you created in the previous step:
        <appSettings>  
            <!-- Twitter--> 
           <add key="consumerKey" value="YOUR_CONSUMER_KEY" />
           <add key="consumerSecret" value="YOUR_CONSUMER_SECRET" />
           <add key="accessToken" value="YOUR_ACCESS_TOKEN" />
           <add key="accessTokenSecret" value="YOUR_ACCESS_TOKEN_SECRET" />
        </appSettings>
  1. Open the project in Visual Studio, build and run it.
  
