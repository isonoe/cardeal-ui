let createLinksOnMap = () => {
  // app.mappingPointsReff.forEach(point => {
  //   point.data.links = [];
  //   point.data.wpLinks.forEach(link => {
  //     point.data.links.push({
  //       point: app.idMappingPointsReff[link.id],
  //       distance: 0
  //     });
  //   });
  // });
};

let addLinkToPoint = point => {
  app.selectedPointToAddLink.data.wpLinks.push({
    id: point.data.id,
    distance: getPointDistanceInM(
      app.selectedPointToAddLink.getCenter(),
      point.getCenter()
    )
  });
  console.log(app.selectedPointToAddLink);

  disableModoAddLink();
};

let removeLinkFromPoint = (point, link) => {
  console.log("point", point);
  console.log("removendo link", link);
  point.data.links.splice(point.data.links.indexOf(link), 1);
  drawAllLineLinks();
};
