var aws =  require('./aws.js');

// here execution starts
aws.getLastQuestionValue();




// if you dont want to use lambda then use this setInterval to create periodic call on the instance running continously  
// setInterval(aws.getLastQuestionValue,1000*60*5) call for every 5 mins


