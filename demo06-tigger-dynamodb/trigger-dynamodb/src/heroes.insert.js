const uuid = require('uuid');
const Joi = require('@hapi/joi');
const { dynamoDB } = require('./factory');
const decoratorValidator = require('./util/decoratorValidator')
const globalEnum = require('./util/globalEnum')

class Handler {
  constructor({ dynamoDbSvc }) {
    this.dynamoDbSvc = dynamoDbSvc;
    this.dynamodbTable = process.env.DYNAMODB_TABLE
  }

  static validator() {
    return Joi.object({
      nome: Joi.string().max(100).min(2).required(),
      poder: Joi.string().max(20).required()
    })
  }

  async inserItem(params) {
    return this.dynamoDbSvc.put(params).promise()
  }

  prepareData(data) {
    const params = {
      TableName: this.dynamodbTable,
      Item: {
        ...data,
        id: uuid.v1(),
        createdAt: new Date().toISOString()
      }
    }

    return params
  }

  handlerSuccess(data) {
    const response = {
      statusCode: 200,
      body: JSON.stringify(data)
    }

    return response
  }

  handlerError(data) {
    return {
      statusCode: data.statusCode || 501,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Couldn\'t create item'
    }
  }

  async main(event) {
    try {      
      // agora o decorator modifica o body e já
      // retorna no formato JSON
      const data = event.body    

      const dbParams = this.prepareData(data)
      await this.inserItem(dbParams);
      return this.handlerSuccess(dbParams.Item)


    } catch (error) {      
      console.error('Deu ruim**', error.stack)
      return this.handlerError({ statusCode: 500 })
    }
  }
}

const handler = new Handler({
  dynamoDbSvc: dynamoDB
})

module.exports = decoratorValidator(handler.main.bind(handler), Handler.validator(), globalEnum.ARG_TYPE.BODY)

// const AWS = require('aws-sdk')

// const host = process.env.LOCALSTACK_HOST || "localhost"  

// const dynamoConfig = {
//   s3ForcePathStyle: true,
//   endpoint: new AWS.Endpoint(`http://${host}:4566`),
//   region: 'us-east-1',
// }

// //factory
// const dynamoDB = new AWS.DynamoDB.DocumentClient(dynamoConfig)
// const handler = new Handler({
//   dynamoDbSvc: dynamoDB
// })
// module.exports = handler.main.bind(handler)