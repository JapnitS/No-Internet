var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const convert = require('xml-js');
const baseUrl =
  'http://www.gotracker.ca/GoTracker/web/GODataAPIProxy.svc/StationStatus/5?_=';

async function fetchTransitData() {
  let data = await fetchData();
  let message = '';
  data.forEach((item) => {
    let attributes = item._attributes;
    console.log(attributes);

    message += '                                   ';
    
    attributes.TripName ? (message += ` NEXT TRIP ----> ${attributes.TripName} `) : (message += `NEXT TRIP ----> ${attributes.Destination}`);
    attributes.Delay == 0
      ? (message += '{On Time}                    ')
      : (message += `{Delayed} ${attributes.DelayDesc} `);
    message += `Train Arrives in : ${attributes.ArriveIn} at ${attributes.ScheduledTime}`;
    //Spaces added for formatting
  });
  return message;
}

fetchData = async () => {
  let date = new Date();
  const url = baseUrl + date.getMilliseconds();
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open('GET', url, false); // false for synchronous request
  xmlHttp.send(null);
  str = xmlHttp.responseText;
  data = JSON.parse(
    convert.xml2json(str, { compact: true, spaces: 4 }),
  );
  data = data.ReturnValueOfListOfStationStatus.Data.StationStatus;
  //str = JSON.parse(str)

  return sortData();
};

function sortData() {
  let unionBound = [];
  data.forEach((item) => {
    if (item._attributes.DirectionIndex == 1) {
      unionBound.push(item);
    }
  });

  return unionBound;
}

module.exports = fetchTransitData;
