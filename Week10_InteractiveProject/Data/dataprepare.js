/*
 * Note that this function uses *synchronous* JavaScript
 * There is a 2-second (2000 milliseconds) timer after which the JSON will be downloaded
 * so if the API calls are not finished by then, the JSON will only have the ones that did finish.
 * You can increase the timer if you need to.
 */

// load a default library that lets us read/write to the file system
var fs = require('fs')
// load a default library that lets us make HTTP requests (like calls to an API)
var request = require('request')

// endpoint URL
const url = 'https://collectionapi.metmuseum.org/public/collection/v1/objects'

// object Ids I want to download
// const myObjectIds = [
//  436524,
//  705155,
//  11922,
//  2032,
//  343052,
//  2019,
//  208554,
//  360837,
//  207869
// ]

const myObjectIds = [11734,203450,436085,187690,187686,187682,187687,187689,203449,436934,196491,435883,11051,479673,435713,558995,551511,551450,551470,551472,464160,435882,242276,42228,189295,242033,203250,399098,11886,437317,571915,398161,337018,246682,128,127,126,461224,247954,652442,46947,46989,48310,437989,251199,201862,367006,389888,342710,652440,436052,255409,437999,437053,436037,241300,205346,1029,380680,435884,6046,436294,242267,438025,465954,437345,242299,437877,399004,388418,187691,187692,187684,187685,187693,356740,361576,420452,13350,203984,203985,252928,302337,709015,435866,340230,818212,407784,707890,817504,436027,436056,253372,54147,242326,241150,241154,242266,197889,205640,228818,412366,209331,208469,416023,436752,467997,192674,256241,470005,459023,693073,752944,436932,436262,437073,436634,337058,13349,340554,342604,407911,196054,242281,435740,206978,237044,211505,428337,754430,437703,435881,436795,51747,388769,187683,187688,427992,436512,718799,428014,361563,392261,205482,436244,437101,435768,287920,710336,195445,205054,460945,436101,436041,754994,338084,197822,56736,336283,337853,425855,367589,227722,13605,459075,237052,700958,189065,354277,700962,402701,754629,671066,22912,700493,700480,700474,700503,700487,700472,313262,423097,385170,436865,458963,436293,53939,749840,749841,701645,341709,436793,700458,700459,700468,700497,700478,700490,700484,700500,700486,700488,700473,700491,700492,700476,700482,700505,198952,340367,435876,39654,436018,435621,460504,450731,437062,319873,436615,443449,193966,228992,436002,317121,317120,436527,451279,451894,436534];

// set up empty Array for us to save results to
const myArray = [];

function fetchUrl(objectId){
    request(url + '/' + objectId, function (error, response, body) {
      console.error('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

      let obj = JSON.parse(body);

      console.log(obj.primaryImage);
      let index = myArray.length;
      myArray[index] = {};
      myArray[index]["objectID"] = obj.objectID;
      myArray[index]["title"] = obj.title;
      myArray[index]["date"] = obj.objectBeginDate;
      myArray[index]["primaryImage"] = obj.primaryImage;
      myArray[index]["classification"] = obj.classification;
      myArray[index]["culture"] = obj.culture;
      myArray[index]["medium"] = obj.medium;
      myArray[index]["metURL"] = obj.objectURL;
      myArray[index]["filename"] = obj.primaryImage.split('/').pop();
      
    });
}

// call the function for each element in the myObjectIds array
myObjectIds.forEach(objectId => {
    fetchUrl(objectId);
});

// fetchUrl(myObjectIds[0]);


// the function inside the setTimeout saves myResults to a JSON
// it will automatically run after 2000 ms
setTimeout(() => {
    fs.writeFileSync('./appleData10.json', JSON.stringify(myArray), 'utf8')
}, 2000)
