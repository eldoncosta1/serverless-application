const decoratorValidator = (fn, schema, argsType) => {
  return async function (event) {
    const data = JSON.parse(event[argsType])
    // abortEarly === mostra todos os erros de uma vez
    const { error, value } = await schema.validate(data, { abortEarly: false })
      
    // isso faz alterar a instancia de arguments
    event[argsType] = value

    // arguments server para pegar todos os argumentos quer vieram na funcao
    // e mandar para frente    
    if (!error) return fn.apply(this, arguments)

    return {
      statusCode: 422, // unprocessable entity,
      body: error.message
    }
    
  }
}

module.exports = decoratorValidator