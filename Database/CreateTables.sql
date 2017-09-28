USE [TweetMashup]
GO


CREATE TABLE [dbo].[PartialLoginInfo](
	[Login] [varchar](36) PRIMARY KEY CLUSTERED NOT NULL,
	[AuthorizationId] [varchar](64) NOT NULL,
	[CreationDate] [datetimeoffset] NOT NULL
)

CREATE TABLE [dbo].[LoginInfo](
	[Login] [varchar](36) PRIMARY KEY CLUSTERED NOT NULL,
	[Username] [nvarchar](16) NOT NULL,
	[CreationDate] [datetimeoffset] NOT NULL,
	[ConsumerKey] [varchar](127) NOT NULL,
	[ConsumerSecret] [varchar](127) NOT NULL,
	[AccessToken] [varchar](127) NOT NULL,
	[AccessTokenSecret] [varchar](127) NOT NULL
)

CREATE TABLE [dbo].[UserInfo](
	[Login] [varchar](36) PRIMARY KEY CLUSTERED NOT NULL,
	[Username] [nvarchar](16) NOT NULL,
	[CreationDate] [datetimeoffset] NOT NULL,
	[FollowerCount] [int] NOT NULL,
	[FollowingCount] [int] NOT NULL
)

CREATE TABLE [dbo].[UserTweetInfo](
	[Username] [nvarchar](16) PRIMARY KEY CLUSTERED NOT NULL,
	[CreationDate] [datetimeoffset] NOT NULL,
	[VALUE] [nvarchar](max) NOT NULL
)

GO

CREATE TABLE [dbo].[AnalyticsLog](
	[Id] int IDENTITY(1,1) PRIMARY KEY CLUSTERED,
	[IsMobile] bit NOT NULL,
	[User1] [nvarchar](16) NOT NULL,
	[User2] [nvarchar](16) NOT NULL,
	[CreationDate] [datetimeoffset] NOT NULL,
	[Login] [varchar](36) NULL,
	[Tweet] [nvarchar](max) NULL
)

GO

CREATE TABLE [dbo].[ViewLog](
	[Id] int IDENTITY(1,1) PRIMARY KEY CLUSTERED,
	[ViewDate] [datetimeoffset] NOT NULL,
	[Login] [varchar](36) NULL
)

GO

CREATE TABLE [dbo].[PresetPairs](
	[User1] [nvarchar](16) NOT NULL,
	[User2] [nvarchar](16) NOT NULL
)
GO

INSERT INTO PresetPairs (User1,User2) Values ('GuyInYourMFA','dril')
INSERT INTO PresetPairs (User1,User2) Values ('parishilton','potus')
INSERT INTO PresetPairs (User1,User2) Values ('dog_rates','realdonaldtrump')
INSERT INTO PresetPairs (User1,User2) Values ('BBCBreaking','elmo')
INSERT INTO PresetPairs (User1,User2) Values ('officialjaden','BuzzFeed')
INSERT INTO PresetPairs (User1,User2) Values ('ch000ch','skyetetra')

