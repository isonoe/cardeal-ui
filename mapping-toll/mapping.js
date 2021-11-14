// let app.selectedPoint = null;
// let app.selectedPointMarker = null;
// let app.modoAddLink = null;
// let app.selectedPointToAddLink = null;
// let app.drawedLines = null;

class WayPoint {
  id = "";
  latLng = {
    lat: 0,
    lng: 0
  };
  links = [];

  constructor(id = null, latLng = null, links = []) { }
}

function initMap() {
  loadJsonMapping().then(json => {
    app.jsonData = json;

    json.mapping.forEach(point => {
      addPointToMap(point.latLng, point.id, point.wpLinks);
    });

    createLinksOnMap();
  });

  app.map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -15.821021, lng: -47.898187 },
    zoom: 18
  });

  app.map.addListener("click", mapsMouseEvent => {
    // Close the current InfoWindow.
    // infoWindow.close();
    // Create a new InfoWindow.
    console.log(mapsMouseEvent.latLng.lat());

    addPointToMap({
      lat: mapsMouseEvent.latLng.lat(),
      lng: mapsMouseEvent.latLng.lng()
    });
  });
}

let setCenterMap = point => {
  console.log("point", point);
  app.map.setCenter(point.getCenter());
  setSelectedPointMarker(point);
};

let refreshSelectedPointMarker = () => {
  setSelectedPointMarker(app.selectedPoint);
};

let setModoAddLink = point => {
  if (app.selectedPoint) {
    app.selectedPoint.setOptions({ fillColor: SELECT_POINT_ADD_LINK_COLOR });
  }
  app.selectedPointToAddLink = point;
  app.modoAddLink = true;
};

let disableModoAddLink = () => {
  if (app.selectedPoint) {
    app.selectedPoint.setOptions({ fillColor: POINT_CIRCLE_FILL_COLOR });
  }
  app.selectedPointToAddLink = null;
  app.modoAddLink = false;
};
