let loadJsonMapping = () => {
  return fetch("./mapping.json").then(response => response.json());
  // .then(json => console.log(json));
};

let exportJsonMapping = () => {
  let mapping = [];

  app.mappingPointsReff.forEach(point => {
    let cloneData = Object.assign({}, point.data);
    // let dataLink = [];
    // point.data.wpLinks.forEach(link => {
    //   let data = {
    //     id: link.point.data.id,
    //     distance: getPointDistanceInM(
    //       app.idMappingPointsReff[link.point.data.id].getCenter(),
    //       point.getCenter()
    //     )
    //   };

    //   dataLink.push(data);
    // });
    // // if(cloneData.latLng){}
    // cloneData.latLng = {
    //   lat: cloneData.latLng.lat(),
    //   lng: cloneData.latLng.lng()
    // };
    // cloneData.wpLinks = dataLink;
    mapping.push(cloneData);
  });

  console.log(mapping);
  console.log(JSON.stringify(mapping));
};
