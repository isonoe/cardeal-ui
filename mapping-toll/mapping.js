

// let app.selectedPoint = null;
// let app.selectedPointMarker = null;
// let app.modoAddLink = null;
// let app.selectedPointToAddLink = null;
// let app.drawedLines = null;


class WayPoint {
  id = '';
  latLng = {
    lat: 0,
    lng: 0
  };
  links = [];

  constructor(id = null, latLng = null, links = []) {

  }
}

function initMap() {

  loadMapJson().then(json => {

    app.jsonData = json

    json.mapping.forEach(point => {
      addPointToMap(point.latLng, point.id, point.linkIds)
    })

    createLinksOnMap();
  });

  app.map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -15.821021, lng: -47.898187 },
    zoom: 18,
  });


  app.map.addListener("click", (mapsMouseEvent) => {
    // Close the current InfoWindow.
    // infoWindow.close();
    // Create a new InfoWindow.
    console.log(mapsMouseEvent.latLng.lat())

    addPointToMap({ lat: mapsMouseEvent.latLng.lat(), lng: mapsMouseEvent.latLng.lng() });

  });
}

let setCenterMap = (point) => {
  console.log("point", point);
  app.map.setCenter(point.getCenter());
  setSelectedPointMarker(point);
}

let refreshSelectedPointMarker = () => {
  setSelectedPointMarker(app.selectedPoint);
}

let setModoAddLink = (point) => {
  if (app.selectedPoint) {
    app.selectedPoint.setOptions({ fillColor: SELECT_POINT_ADD_LINK_COLOR })
  }
  app.selectedPointToAddLink = point;
  app.modoAddLink = true;
}

let disableModoAddLink = () => {
  if (app.selectedPoint) {
    app.selectedPoint.setOptions({ fillColor: POINT_CIRCLE_FILL_COLOR })
  }
  app.selectedPointToAddLink = null;
  app.modoAddLink = false;
}

let mountRoute = (origem, destino) => {

  var config = {
    method: 'get',
    url: 'https://maps.googleapis.com/maps/api/directions/json?origin=heading%3D90%3A37.773279%2C-122.468780&destination=37.773245%2C-122.469502&key=AIzaSyAy0KX2T54ai4ZUZp829QpXG5hIwhlMSrQ',
    headers: {}
  };
  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });

  let url = "https://maps.googleapis.com/maps/api/directions/json?" +
    "destination=" + destino.lat + '%2C' + destino.lng +
    "&origin=" + origem.lat + '%2C' + origem.lng +
    "&key=AIzaSyAy0KX2T54ai4ZUZp829QpXG5hIwhlMSrQ";

  fetch(url)
    .then(function (response) {
      console.log(response)
    });

  // axios
  //   .get(url)
  //   .then(response => (console.log(response)));
}

let exportMapping = () => {
  let mapping = [];

  app.mappingPointsReff.forEach(point => {
    let cloneData = Object.assign({}, point.data);
    let dataLink = [];
    point.data.links.forEach(link => {
      dataLink.push(link.point.data.id);
    });
    // if(cloneData.latLng){}
    // cloneData.latLng = {
    //   lat: cloneData.latLng.lat(),
    //   lng: cloneData.latLng.lng()
    // }
    cloneData.linkIds = dataLink;
    delete cloneData['links'];
    mapping.push(cloneData);
  });

  console.log(mapping)
  console.log(JSON.stringify(mapping));
}
