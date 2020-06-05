var unirest = require('unirest');

var API_KEY = process.env.API_KEY;
var FD_ENDPOINT = process.env.ENDPOINT;

var PATH = "/api/v2/tickets";
var URL =  "https://" + FD_ENDPOINT + ".freshdesk.com"+ PATH;


var lastQuestionId = 0;    

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
              console.log("X-Request-Id :" + response.headers['x-request-id']);
        }
        });
      
}


function requestInfo (items) {
  let c =  items;
  var temQuestion = lastQuestionId;
  for(var i=0;i<c.length;i++){
    let e = c[i];
    if(lastQuestionId === e.question_id)
      break;

    if(!e.is_answered){
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
    tempQuestion = e.question_id;
  }

lastQuestionId = temQuestion;

}
const main = ()=>{
  const parameters = ["firebase","google-cloud"].join(",") // add your search filter parameters here
  console.log(parameters)
  const url = "https://api.stackexchange.com/search/advanced?site=stackoverflow.com&q="+parameters
  unirest.get(url)
  .then(e=>{
         
          var e= JSON.parse(e.raw_body)
          requestInfo(e.items);
  
  })

}
main();
setInterval(main,1000*60*5)// call for every 5 mins


