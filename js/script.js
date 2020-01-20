
// Initialize firebase
firebase.initializeApp(FIREBASECONFIG);
var db = firebase.firestore();

var lmap = L.map('map').setView([21.0079, 10.9408], 3);
var geojson;

// use mapBox as the base map provider
L.tileLayer.provider('MapBox', {
  id: 'mapbox.light',
  accessToken: 'pk.eyJ1IjoidGF5YWtpdHQiLCJhIjoiY2s1Y284Ym9hMW50ODNnbzMwbHBmaHR1eiJ9._DGyRf1U27iZwnGv5Ar56A'
}).addTo(lmap);

// var geojsonLayer = new L.GeoJSON.AJAX(countries);
// geojsonLayer.addTo(lmap);
function getColor(d) {
  console.log(d);
  if (!d) {
    return 'red';
  }

  return d > 1000 ? '#800026' :
    d > 500 ? '#BD0026' :
      d > 200 ? '#E31A1C' :
        d > 100 ? '#FC4E2A' :
          d > 50 ? '#FD8D3C' :
            d > 20 ? '#FEB24C' :
              d > 10 ? '#FED976' :
                '#FFEDA0';
}

function style(feature) {
  return {
    fillColor: getColor(feature.properties.numOfTrips),
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.6
  };
}

// highlight countries on mouseover event 
function highlightFeature(e) {
  var layer = e.target;

  // set a thick grey border on the layer
  layer.setStyle({
    weight: 3,
    color: '#666',
    dashArray: '',
    fillOpacity: 0.7
  });

  // bringing it to the front so that the border doesn’t clash with nearby states
  // (but not for IE, Opera or Edge, since they have problems doing bringToFront on mouseover)
  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }

  // update info box
  info.update(layer.feature.properties);
}

// unhighlight countries on mouseout event
function resetHighlight(e) {
  // reset the layer style to its default state (defined by our style function)
  geojson.resetStyle(e.target);

  // reset info box
  info.update();
}

// zoom into the country on click
function zoomToFeature(e) {
  lmap.fitBounds(e.target.getBounds());
}

// add event handler on each country layers
function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    click: zoomToFeature
  });
}

geojson = L.geoJson(countries, { style: style, onEachFeature: onEachFeature }).addTo(lmap);

// create information box on the top right
var info = L.control();

info.onAdd = function (map) {
  // create a div with a class "info"
  this._div = L.DomUtil.create('div', 'info');
  this.update();
  return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
  this._div.innerHTML = '<h4>US Population Density</h4>' + (props ?
    '<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>'
    : 'Hover over a state');
};

// add information box to map
info.addTo(lmap);

// create legend for colours
var legend = L.control({ position: 'bottomright' });

legend.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'info legend'),
    grades = [0, 10, 20, 50, 100, 200, 500, 1000],
    labels = [];

  // loop through our density intervals and generate a label with a colored square for each interval
  for (var i = 0; i < grades.length; i++) {
    div.innerHTML +=
      '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
      grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
  }
  return div;
};

legend.addTo(lmap);