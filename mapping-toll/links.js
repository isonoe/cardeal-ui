let createLinksOnMap = () => {
  app.mappingPointsReff.forEach(point => {
    point.data.links = [];
    point.data.linkIds.forEach(link => {
      point.data.links.push({ point: app.idMappingPointsReff[link], distance: 0 });
    });
  });
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
  drawAllLineLinks();
}