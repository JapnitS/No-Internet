var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

const checkDict = (query) => {
  console.log('FROM DICT,', query);
  let url =
    'https://api.dictionaryapi.dev/api/v2/entries/en/' + query;
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open('GET', url, false);
  xmlHttp.send(null);

  return formatResponse(xmlHttp.responseText, query);
};

const formatResponse = (res, query) => {
  res = JSON.parse(res);
  let origin = res[0].origin;

  let meanings1 = [];
  let meanings2 = [];

  res[0].meanings.forEach((meaning) => {
    meaning.definitions.forEach((def) => {
      meanings1.push(def)['definition'];
    });
  });

  meanings1.forEach((element) => {
    meanings2.push(element['definition']);
  });
  let message =
    query +
    ' is originated from ' +
    origin +
    '\n' +
    'It means: ' +
    meanings2.join('or ');
    console.log(message);
  return message;
};

module.exports = checkDict;
