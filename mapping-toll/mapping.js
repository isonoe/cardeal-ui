

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

let addPointToMap = (latLng, id = null, linkIds = null) => {
  const point = new google.maps.Circle({
    strokeColor: POINT_CIRCLE_STROKE_COLOR,
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: POINT_CIRCLE_FILL_COLOR,
    fillOpacity: 0.35,
    map: app.map,
    center: latLng,
    radius: 5,
    data: {
      id: id || app.mappingPointsReff.length + '' + Math.floor(Math.random() * 1000000),
      latLng: latLng,
      linkIds: linkIds || [],
      links: []
    }
  });

  point.addListener("click", (mapsMouseEvent) => {
    console.log(mapsMouseEvent);
    console.log(point);
    if (app.modoAddLink) {
      if (app.selectedPoint !== point) {
        addLinkToPoint(point);
        refreshSelectedPointMarker();
      } else {
        disableModoAddLink();
      }
    } else {
      if (app.selectedPoint === point) {
        setModoAddLink(point)
      } else {
        setSelectedPointMarker(point);
      }
    }

  });

  app.idMappingPointsReff[point.data.id] = point;
  app.mappingPointsReff.push(point);
}


let createLinksOnMap = () => {
  app.mappingPointsReff.forEach(point => {
    point.data.links = [];
    point.data.linkIds.forEach(link => {
      point.data.links.push({ point: app.idMappingPointsReff[link], distance: 0 });
    });
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
  if (app.selectedPointMarker)
    app.selectedPointMarker.setMap(null);
  point.setMap(null);
  app.mappingPointsReff.splice(app.mappingPointsReff.indexOf(point), 1);
  delete app.idMappingPointsReff[point.data.id];
}



let refreshSelectedPointMarker = () => {
  setSelectedPointMarker(app.selectedPoint);
}
let setSelectedPointMarker = (point) => {
  if (app.selectedPoint) {
    app.selectedPoint.setOptions({ fillColor: "#FF0000" })
  }
  app.selectedPoint = point;
  if (app.selectedPointMarker)
    app.selectedPointMarker.setMap(null);

  app.selectedPointMarker = new google.maps.Marker({
    position: point.getCenter(),
    map: app.map,
    animation: google.maps.Animation.DROP,
    title: "Point selecionado",
  });

  drawAllLineLinks();
}

let addLinkToPoint = (point) => {
  app.selectedPointToAddLink.data.links.push({ point, distance: 10 });
  console.log(app.selectedPointToAddLink);

  disableModoAddLink();
}

let removeLinkFromPoint = (point, link) => {
  console.log('point', point);
  console.log('removendo link', link);
  point.data.links.splice(point.data.links.indexOf(link), 1);
}

let setModoAddLink = (point) => {
  if (app.selectedPoint) {
    app.selectedPoint.setOptions({ fillColor: "#FFFF00" })
  }
  app.selectedPointToAddLink = point;
  app.modoAddLink = true;
}

let disableModoAddLink = () => {
  if (app.selectedPoint) {
    app.selectedPoint.setOptions({ fillColor: "#FF0000" })
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



let resetDrawedLines = () => {
  if (app.drawedLines) {
    app.drawedLines.forEach(link => {
      link.setMap(null);
    })
  }
  app.drawedLines = [];
}

let drawAllLineLinks = () => {

  resetDrawedLines();

  if (app.selectedPoint && app.selectedPoint.data && app.selectedPoint.data.links.length) {
    app.selectedPoint.data.links.forEach(link => {

      app.drawedLines.push(drawLine(app.selectedPoint.getCenter(), link.point.getCenter()));
    });
  }

}
let drawLine = (origem, destino) => {
  const lineCoordinates = [
    origem,
    destino
  ];
  const line = new google.maps.Polyline({
    path: lineCoordinates,
    geodesic: true,
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });

  line.setMap(app.map);
  return line;
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
