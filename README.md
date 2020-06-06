
# FW-Stack
This project is built for Freshworks Freshdesk.
This NodeJs application creates an automatic ticket based on the question tag. Just enter the list of tags and then this application creates a ticket to Freshdesk.
### ScreeenShoot 

#### Ticket List
<img src="https://raw.githubusercontent.com/hariprasath2603/FW-Stack/master/screenshot/Freshdesk_ss_01.png" alt="Screen_1" width="700">

#### Individual Ticket
<img src="https://raw.githubusercontent.com/hariprasath2603/FW-Stack/master/screenshot/Freshdesk_ss_02.png" alt="Screen_2" width="700">

## Architecture 

![FW-Stack Arch](https://raw.githubusercontent.com/hariprasath2603/FW-Stack/master/screenshot/FW-Stack.jpg)

 - AWS DynamoDb, Lambda, Cloudwatch are required.
 - Instead of AWS Lambda, you can use setTimeout also on a backend server but it is not efficient.

## Functions :tickets:
| Function Name | Description |
|--|--|
| createTicket | It accepts parameters and create a new ticket on Freshdesk  |
| requestInfo | Get questions list and transform to parameters required to create ticket |
| main | This is the main function where questions gathered from StackOverflow and passed to next function |
| getLastQuestionValue | It gets the last questionId inserted or checked from StackOverflow  |
| updateLastQuestionValue | It stores the fist question id so that on next time we terminate when this questionId repeats |

## Caution :warning:	
Stackoverflow only allows 300 requests/day. If you want more frequent execution register and integrates the key from Stack Apps.

### AWS Configuration 

 - Create DynamoDB with two fields AppName and lastQuestion
  - Create a Lambda function  with this Nodejs project
 - Add IAM permissions of Read and Write in specific DynamoDB to Lambda function
 - Add environmental variables to the lambda function
 - Enable AWS CloudWatch with the rules of trigger lambda with schedule time of your choose (5 min recommended)


### Environment variables
 - Use AWS with valid IAM role permissions on that DynamoDB
 - Create a DynamoDBin AWS 
 - These parameters are required for this project
 - Enter the tags you have to listen  in the main function parameters
 - Config file contains the required variables
 - Change this parameters to your tag which want to lookfor.
	 - `const parameters = ["firebase","google-cloud"].join(",")`
	 - Now it looking for firebase and google-cloud 
	 - change tags to what you prefered
	 
| Environment variables |Description  |
|--|--|
| accessKeyId | AWS access key |
| secretAccessKey | AWS secret Key |
| region | Region where DynamoDB created |
| DynamoDBTableName | Name of the table created in AWS DynamoDB|
| FD_ENDPOINT | Your Freshdesk app endpoint (subdomain) |
|  API_KEY| Freshdesk API key  |

### Packages & others :package:

 - AWS-SDK
 - unirest
 - Freshworks REST APIs

 

