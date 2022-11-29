"use strict";

module.exports.hello = async (event) => {
  console.log('Ja chegou o disco voador')
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Aiii simm",
        input: event,
      },
      null,
      2
    ),
  };
};
