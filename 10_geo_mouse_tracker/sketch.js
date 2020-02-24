// IOTA API
var iota = {
  url : "http://192.168.10.10",
  username : "test",
  password : "test",
  deviceId : "5e35183a8a8e4fdf9f071a50a6a2c62b",
  routeId : "244"
};

// Create a variable to hold our map
var myMap;
// Create a variable to hold our canvas
var canvas;
// Create a new Mappa instance using Leaflet.
var mappa = new Mappa('Leaflet');


// Lets put all our map options in a single object
var options = {
  lat: 50.0905,
  lng: 14.4270,
  zoom: 17,
  style: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
}

// IOTA Authorization
var authorizationToken = "";
var authorizationSuccess = false;

var routePoints;
var drawRoutePoints = false;
var readRoutePoints = true;

function setup(){
  canvas = createCanvas(640, 640).parent('sketch-holder');;
  // background(100); let's uncomment this, we don't need it for now

  // Create a tile map with the options declared
  myMap = mappa.tileMap(options);
  
  // Only redraw
  //myMap.onChange(onChangeDraw);
  myMap.overlay(canvas);

  // IOTA
  iotaAuthorization();
}

// Storage
var data = [];
// Counter
var counter = 0;

function draw(){
  // Clear the background so the map is clearly seen at each frame.
  clear();
  // Get lat, lng coordinates
  var position = myMap.pixelToLatLng(mouseX, mouseY);
  
  // Track mouse position
  text(position.lat + ", " +  position.lng, mouseX, mouseY);

  // Record data
  counter++;
  if (counter % 10 == 0) {
    data.push(position);
  }

  // Draw mouse track
  fill(200, 100, 100);
  for (let i = 0; i < 10; i++) {
    if (data.length <= i) break;
    const geo = data[data.length - 1 - i];
    var pix = myMap.latLngToPixel(geo.lat, geo.lng);
    ellipse(pix.x, pix.y, 10, 10);
  };
  // Reduce data storage
  if (data.length > 20) {
    data = data.slice(data.length - 20);
  }

  // IOTA ready to use
  if (authorizationSuccess && readRoutePoints) {
    readRoutePoints = false;
    iotaGetRoutePoints();
  }

  // Draw IOTA Routes
  if(drawRoutePoints) {
    drawRoute();
  }
}

// Mouse pressed
function mousePressed(){
  readRoutePoints = true;
}

// Draw route
function drawRoute() {
  fill(100, 200, 100);
  for (let i = 0; i < routePoints.length; i++) {
    const p = routePoints[i];
    const lng = p.coordinates[0]; // Otoceno!!! lat a lng
    const lat = p.coordinates[1];
    const pix = myMap.latLngToPixel(lat, lng)
    ellipse(pix.x, pix.y, 10, 10);
  }
}

// IOTA Authorization
function iotaAuthorization() {
  let url = iota.url + ":9501/api/GetSecurityToken" + "?username=" + iota.username + "&password=" + iota.password;
  let msg = {};
  httpPost(
    url,
    "json",
    msg,
    function(res) {
      authorizationToken = res;
      authorizationSuccess = true;
      console.log("Authorization OK", res);
    }
  );
}

// IOTA Get route points
function iotaGetRoutePoints() {
  // Send data to API
  var url = iota.url + ":46901/api/GeoFunctions/getRoutePoints";
  url += "?deviceId=" + iota.deviceId;
  url += "&routeId=" + iota.routeId;
  httpDo(url, 
    {
      method : "GET",
      data: {},
      headers: { authorization: authorizationToken.token_type + " " + authorizationToken.access_token }
    },
    function(res) {
      routePoints = JSON.parse(res);
      drawRoutePoints = true;
      console.log("Get route points OK", res);
    })
}

function onChangeDraw(){
  // Clear the canvas
  clear();
  // ?
}
