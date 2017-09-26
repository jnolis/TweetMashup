namespace Website

open System.Data.SqlClient
open System.Data
open System.Runtime.Caching

module Shared =
    let createSqlConnection() =
        let connectionString = System.Configuration.ConfigurationManager.ConnectionStrings.["TweetMashup"].ConnectionString
        new SqlConnection(connectionString)

