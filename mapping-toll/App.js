
var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    mappingPointsReff: [],
    idMappingPointsReff: {},
    map: null,
    selectedPoint: null,
    selectedPointMarker: null,
    modoAddLink: null,
    selectedPointToAddLink: null,
    drawedLines: null,
  }
})