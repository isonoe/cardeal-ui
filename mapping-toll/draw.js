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

let drawCircle = (latLng)=> {
  const point = new google.maps.Circle({
    strokeColor: POINT_CIRCLE_STROKE_COLOR,
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: POINT_CIRCLE_FILL_COLOR,
    fillOpacity: 0.35,
    map: app.map,
    center: latLng,
    radius: 5,
  });
  return point;
}
   