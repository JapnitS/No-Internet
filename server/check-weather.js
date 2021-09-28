var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const checkWeather = (city) => {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open(
      'GET',
      'https://api.openweathermap.org/data/2.5/weather?q=' +
        city +
        '&appid=0c4cafc732d5cca1dafebe44159f496d',
      false,
    ); // false for synchronous request
  
    xmlHttp.send(null);
    return formatWeather(xmlHttp.responseText,city);
  };

const formatWeather = (res,query) => {
    
    res = JSON.parse(res);

    let min_temp = parseInt(res['main']['temp_min']) / 10;
    let max_temp = parseInt(res['main']['temp_max']) / 10;
    let message = 
      'The weather in' +
        query +
        ' is ' +
        res['weather'][0]['description'] +
        ' with a min temp of ' +
        min_temp +
        ' degrees celcius and a max temp of ' +
        max_temp +
        ' degrees celcius'
    return message;
    

}


module.exports = checkWeather;
  