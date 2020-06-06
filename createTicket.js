var aws =  require('./aws.js');
var unirest = require('unirest');
var {config} =  require('./config.js');

var API_KEY = config.API_KEY; // Freshdesk API key
var FD_ENDPOINT = config.FD_ENDPOINT; // your freshdesk app name 

var PATH = "/api/v2/tickets";
var URL =  "https://" + FD_ENDPOINT + ".freshdesk.com"+ PATH;


// get parameters and creates new ticket in freshdesk for each call it creates single ticket

/*
Subject - title of the question in stackoverflow
Description  -  Here we added only link but we can add anything into it
Id - stackiverflow user id how created the question
*/
createTicket = (subject,description,custom,id)=>{
    id = id+"@stackoverflow.com"
    let fields = {
        'email': id,
        'subject': subject,
        'description': description,
        'status': 2,
        'priority': 2,
        "requester_id":1

      }
      
    let Request = unirest.post(URL);
      
      Request.auth({
        user: API_KEY,
        pass: "X",
        sendImmediately: true
      })
      .type('json')
      .send(fields)
      .end(function(response){
        console.log(response.body)
        console.log("Response Status : " + response.status)
        if(response.status == 201){
          console.log("Location Header : "+ response.headers['location'])
        }
        else{
             console.log("X-Request-Id :" + response);
        }
        });
      
}

/*
 convert the raw staccoverflow questions into list of question which was not added before
this function use last question id to stock previously added question 
 */

function requestInfo (items,lastQuestionId) {

    console.log(items.length,lastQuestionId)
    let c =  items;
    var tempQuestion = c[0].question_id;
    for(var i=0;i<c.length;i++){
      let e = c[i];
      if(lastQuestionId === e.question_id)
        break;
  
      if(!e.is_answered){  // it only create ticket for the question which are not answered
          const description =  "Link : "+ e.link
          const title = e.title;
          const owner = e.owner.id;
          const custom = {
            "tags":e.tags,
            "createdBy":e.owner.display_name,
            "noOfAnswers": e.answer_count
          }
  
        createTicket(title,description,custom,owner);     
      
      }
    }
        // update dynamoDb with the lst question id
        aws.updateLastQuestionValue(tempQuestion)
        createTicket("title","description",null,"har");     
    
  }

  // main function where  execution starts
  module.exports.main = (lastQuestionId)=>{
    const parameters = ["firebase","google-cloud"].join(",") // add your search filter tags here
    const url = "https://api.stackexchange.com/search/advanced?site=stackoverflow.com&q="+parameters
    unirest.get(url)
    .then(e=>{
           
            var e= JSON.parse(e.raw_body)
            requestInfo(e.items,lastQuestionId); // send the 
    
    })
    
  
  }