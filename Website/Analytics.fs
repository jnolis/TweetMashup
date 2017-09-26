namespace Website

open Shared
open System.Data.SqlClient
open System.Data
open System.Runtime.Caching

type AnalyticsData = {
    IsMobile: bool
    User1: string
    User2: string
    CreationDate: System.DateTimeOffset
    Login: string option
}

module Analytics =
    let pushAt = 10
    let resetAt = 5
    let mutable isPushAvailable = true
    let analyticsQueue = System.Collections.Concurrent.ConcurrentQueue<AnalyticsData>()

    let analyticsPush =
        async {
            use table = new System.Data.DataTable() 
            table.Columns.Add(new System.Data.DataColumn("IsMobile",typeof<bool>,AllowDBNull=false))
            table.Columns.Add(new System.Data.DataColumn("User1",typeof<string>,AllowDBNull=false))
            table.Columns.Add(new System.Data.DataColumn("User2",typeof<string>,AllowDBNull=false))
            table.Columns.Add(new System.Data.DataColumn("CreationDate",typeof<System.DateTimeOffset>,AllowDBNull=false))
            table.Columns.Add(new System.Data.DataColumn("Login",typeof<string>,AllowDBNull=true))
            while not analyticsQueue.IsEmpty do
                let mutable tempItem = {IsMobile = false; User1 = ""; User2 = ""; CreationDate = System.DateTimeOffset.MinValue; Login = None}
                if analyticsQueue.TryDequeue(&tempItem) then
                    let row = table.NewRow()
                    row.["IsMobile"] <- tempItem.IsMobile
                    row.["User1"] <- tempItem.User1
                    row.["User2"] <- tempItem.User2
                    row.["CreationDate"] <- tempItem.CreationDate
                    match tempItem.Login with
                    | Some l -> row.["Login"] <- l
                    | None -> row.["Login"] <- System.DBNull.Value
                    table.Rows.Add(row)

            use connection = createSqlConnection()
            let bulkCopy = new System.Data.SqlClient.SqlBulkCopy(connection,BulkCopyTimeout = 0, DestinationTableName = "AnalyticsLog")

            seq {for c in table.Columns -> c.ColumnName}
            |> Seq.iter (fun cn -> bulkCopy.ColumnMappings.Add(cn,cn) |> ignore)
            
            connection.Open()
            bulkCopy.WriteToServer(table)
            connection.Close()
            connection.Dispose()
            return ()
        }

    let writeAnalytics (data: AnalyticsData) = 
        if analyticsQueue.Count <= resetAt then
            isPushAvailable <- true
        analyticsQueue.Enqueue(data)
        if isPushAvailable && analyticsQueue.Count >= pushAt then
            isPushAvailable <- false
            Async.Start analyticsPush
            