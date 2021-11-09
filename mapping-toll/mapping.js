

let selectedPoint = null;
let selectedPointMarker = null;

let modoAddLink = null;
let selectedPointToAddLink = null;

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


  loadMapJson().then(json => console.log(json));
  app.map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -15.821021, lng: -47.898187 },
    zoom: 18,
  });


  app.map.addListener("click", (mapsMouseEvent) => {
    // Close the current InfoWindow.
    // infoWindow.close();
    // Create a new InfoWindow.
    console.log(mapsMouseEvent.latLng.lat())

    const point = new google.maps.Circle({
      strokeColor: POINT_CIRCLE_STROKE_COLOR,
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: POINT_CIRCLE_FILL_COLOR,
      fillOpacity: 0.35,
      map: app.map,
      center: mapsMouseEvent.latLng,
      radius: 5,
      data: {
        id: app.mappingPointsReff.length + '' + Math.floor(Math.random() * 1000000),
        latLng: mapsMouseEvent.latLng,
        links: []
      }
    });

    point.addListener("click", (mapsMouseEvent) => {
      console.log(mapsMouseEvent);
      console.log(point);
      if (modoAddLink) {
        addLinkToPoint(point);
      }
      if (point.fillColor == "#FF0000") {

        point.setOptions({ fillColor: "#FFFF00" })
      } else {
        point.setOptions({ fillColor: "#FF0000" })

      }
    });

    app.mappingPointsReff.push(point);
    // infoWindow = new google.maps.InfoWindow({
    //   position: mapsMouseEvent.latLng,
    // });
    // infoWindow.setContent(
    //   JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
    // );
    // infoWindow.open(map);
  });
}

let loadMapJson = () => {
  return fetch("./mapping.json")
    .then(response => response.json())
  // .then(json => console.log(json));
}

let setPointCenter = (point) => {
  console.log("point", point);
  app.map.setCenter(point.getCenter());
  setSelectedPointMarker(point);
}

let removePoint = (point) => {
  if (selectedPointMarker)
    selectedPointMarker.setMap(null);
  point.setMap(null);
  app.mappingPointsReff.splice(app.mappingPointsReff.indexOf(point), 1);
}

let setSelectedPointMarker = (point) => {
  if (selectedPointMarker)
    selectedPointMarker.setMap(null);

  selectedPointMarker = new google.maps.Marker({
    position: point.getCenter(),
    map: app.map,
    title: "Point selecionado",
  });
}

let addLinkToPoint = (point) => {
  selectedPointToAddLink.data.links.push({ point, distance: 10 });
  console.log(selectedPointToAddLink);
  disableModoAddLink();
}

let removeLinkFromPoint = (point, link) => {
  console.log('point', point);
  console.log('removendo link', link);
  point.data.links.splice(point.data.links.indexOf(link), 1);
}

let setModoAddLink = (point) => {
  selectedPointToAddLink = point;
  modoAddLink = true;
}

let disableModoAddLink = () => {
  selectedPointToAddLink = null;
  modoAddLink = false;
}

