module.exports.config={
    region: process.env.region,  // your DynamoDb region
    accessKeyId: process.env.accessKeyId, // your aws accessKey
    secretAccessKey: process.env.secretAccessKey, // your aws secetKey
    table:process.env.DynamoDBTableName, // name of the DynamoDb table
    API_KEY : process.env.API_KEY, // Freshdesk API key
    FD_ENDPOINT : process.env.appName // your freshdesk app name 
}