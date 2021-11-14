let removePoint = point => {
  if (app.selectedPointMarker) app.selectedPointMarker.setMap(null);
  point.setMap(null);
  app.mappingPointsReff.splice(app.mappingPointsReff.indexOf(point), 1);
  delete app.idMappingPointsReff[point.data.id];
};

let setSelectedPointMarker = point => {
  if (app.selectedPoint) {
    app.selectedPoint.setOptions({ fillColor: "#FF0000" });
  }
  app.selectedPoint = point;
  if (app.selectedPointMarker) app.selectedPointMarker.setMap(null);

  app.selectedPointMarker = new google.maps.Marker({
    position: point.getCenter(),
    map: app.map,
    animation: google.maps.Animation.DROP,
    title: "Point selecionado"
  });

  drawAllLineLinks();
};

let addPointToMap = (latLng, id = null, wpLinks = null) => {
  const point = drawCircle(latLng);
  let data = {
    id:
      id ||
      app.mappingPointsReff.length + "" + Math.floor(Math.random() * 1000000),
    latLng: latLng,
    wpLinks: wpLinks || []
  };
  point.data = data;

  point.addListener("click", mapsMouseEvent => {
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
        setModoAddLink(point);
      } else {
        setSelectedPointMarker(point);
      }
    }
  });

  app.idMappingPointsReff[point.data.id] = point;
  app.mappingPointsReff.push(point);
};
