
// app.data.map = null;
// app.data.map.mappingPointsReff = [];

let mappingPoints = [];



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
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
      map: app.map,
      center: mapsMouseEvent.latLng,
      radius: 5,
      data: { id: app.mappingPointsReff.length + '-' + Math.floor(Math.random() * 1000000) }
    });

    point.addListener("click", (mapsMouseEvent) => {
      console.log(mapsMouseEvent);
      console.log(point);
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
}

let removePoint = (point) => {
  point.setMap(null);
  app.mappingPointsReff.splice(app.mappingPointsReff.indexOf(point), 1);
}