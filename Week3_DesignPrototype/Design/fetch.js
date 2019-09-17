
var deptID = '11';


const objectBaseUrl = "https://collectionapi.metmuseum.org/public/collection/v1/objects/";
const departmentsUrl = 'https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=' + deptID;

function fetchDepartmentsData(url) {
  window
    .fetch(url)
    .then(data => data.json())
    .then(data => {
      console.log("fetchDepartmentsData", data);
      const departments = data.departments;
      const EuropeanPaintinsDepartment = departments.find(
        d => d.displayName === "European Paintings"
      );
      const EuropeanPaintinsDepartmentId = EuropeanPaintinsDepartment.departmentId;
      fetchObjectsByDepartment(EuropeanPaintinsDepartmentId);
    });
}
fetchDepartmentsData(departmentsUrl);



function fetchObjectsByDepartment(departmentId) {
     const objectsUrl = 'https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=' + deptID;
     fetchMuseumData(objectsUrl);
}

fetchObjectsByDepartment(deptID);


// let metData;
let myArray = [];

// fetch a query
function fetchMuseumData(url) {
  window
    .fetch(url)
    .then(data => data.json())
    .then(data => {
      console.log("fetchMuseumData", data);
      fetchObjects(data);
    });
}

// from the response, fetch objects
function fetchObjects(data) {
  let objectIDs = data.objectIDs.slice(0, 10);
  console.log("fetching: " + objectIDs.length + " objects");
  objectIDs.forEach(function(n) {
    // console.log(objectBaseUrl + n);
    let objUrl = objectBaseUrl + n;
    window
      .fetch(objUrl)
      .then(data => data.json())
      .then(data => {
        // console.log(data);
        addObject(data);
      });
  });
}

// create your own array using just the data you need
function addObject(objectData) {
  var currentID = objectData.objectID;
  var currentTitle = objectData.title;
  var currentDate = objectData.objectBeginDate;
  var endDate = objectData.objectEndDate;
  var artistName = objectData.artistDisplayName;
  var artistBeginDate = objectData.artistBeginDate;
  var artistEndDate = objectData.artistEndDate;
  var geoLocation = objectData.artistDisplayBio;
  var index = myArray.length;
  myArray[index] = {};
  myArray[index]["id"] = currentID;
  myArray[index]["title"] = currentTitle;
  myArray[index]["from"] = currentDate;
  myArray[index]["to"] = endDate;
  myArray[index]["name"]= artistName;
  myArray[index]["yearOfBirth"] = artistBeginDate;
  myArray[index]["yearOfDeath"] = artistEndDate;
  myArray[index]["distanceBetween"] = geoLocation;

  myArray.push({
      id: objectData.objectID,
      title: objectData.title,
      from: objectData.objectBeginDate,
      to: objectData.objectEndDate,
      name: objectData.artistDisplayName,
      yearOfBirth: objectData.artistBeginDate,
      yearOfDeath: objectData.artistEndDate,
      distanceBetween: objectData.artistDisplayBio
    });

  console.log("object at index", index, myArray[index]);
  // fs.writeFileSync('../Week3_DesignPrototype/data', JSON.stringify(index));
}

