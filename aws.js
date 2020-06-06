var AWS = require("aws-sdk");
var {config} =  require('./config.js');

AWS.config.update({
  region: config.region,  // your DynamoDb region
  accessKeyId: config.accessKeyId, // your aws accessKey
  secretAccessKey: config.secretAccessKey, // your aws secetKey
});

var docClient = new AWS.DynamoDB.DocumentClient();
var mainLib =  require("./createTicket");
console.log(config)
var table = config.table; // name of the DynamoDb table
var appName = config.FD_ENDPOINT; // your freshdesk app name


/* 
This function get the last queston id stored in dynamoDb and call the next function

*/
module.exports.getLastQuestionValue = ()=>{
    var params = {
        TableName: table,
        Key:{
            "AppName":appName
        }
    };
    
   return docClient.get(params, (err, data)=> {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
            return 0;
        } else {
            //console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
            console.log("Get value id : ", data.Item.lastQuestion);

            mainLib.main(data.Item.lastQuestion);
        }
    })
    

}
module.exports.updateLastQuestionValue = (newQuestionId)=>{
        var params = {
            TableName:table,
            Key:{
                "AppName":appName
            },
            UpdateExpression: "set lastQuestion = :r",
            ExpressionAttributeValues:{
                ":r":newQuestionId
                },
            ReturnValues:"UPDATED_NEW"
        }
        docClient.update(params, function(err, data) {
            if (err) {
                console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
            }
        });

}




