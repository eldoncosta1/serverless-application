const AWS = require('aws-sdk')

const host = process.env.LOCALSTACK_HOST || "localhost"  

const dynamoConfig = {
  s3ForcePathStyle: true,
  endpoint: new AWS.Endpoint(`http://${host}:4566`),
  region: 'us-east-1',
}

const dynamoDB = new AWS.DynamoDB.DocumentClient(dynamoConfig)

module.exports = {
  dynamoDB
}