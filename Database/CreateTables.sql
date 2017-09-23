USE [TweetMashup]
GO


CREATE TABLE [dbo].[PartialLoginInfo](
	[Login] [varchar](36) NOT NULL,
	[AuthorizationId] [varchar](64) NOT NULL,
	[CreationDate] [datetimeoffset] NOT NULL
)
CREATE CLUSTERED INDEX idx ON PartialLoginInfo (Login)


CREATE TABLE [dbo].[LoginInfo](
	[Login] [varchar](36) NOT NULL,
	[Username] [nvarchar](16) NOT NULL,
	[CreationDate] [datetimeoffset] NOT NULL,
	[ConsumerKey] [varchar](127) NOT NULL,
	[ConsumerSecret] [varchar](127) NOT NULL,
	[AccessToken] [varchar](127) NOT NULL,
	[AccessTokenSecret] [varchar](127) NOT NULL
)
CREATE CLUSTERED INDEX idx ON LoginInfo (Login)

CREATE TABLE [dbo].[UserInfo](
	[Login] [varchar](36) NOT NULL,
	[Username] [nvarchar](16) NOT NULL,
	[CreationDate] [datetimeoffset] NOT NULL,
	[FollowerCount] [int] NOT NULL,
	[FollowingCount] [int] NOT NULL
)
CREATE CLUSTERED INDEX idx ON UserInfo (Login)

GO

