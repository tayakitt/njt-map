
// Initialize firebase
firebase.initializeApp(FIREBASECONFIG);
var db = firebase.firestore();

// get trip and update GeoJSON data
// getTrips();

// create map and set center lat & lng
var map = L.map('map').setView([21.0079, 10.9408], 3);
var geojson;

// use mapBox as the base map provider
L.tileLayer.provider('MapBox', {
  id: 'mapbox.light',
  accessToken: 'pk.eyJ1IjoidGF5YWtpdHQiLCJhIjoiY2s1Y284Ym9hMW50ODNnbzMwbHBmaHR1eiJ9._DGyRf1U27iZwnGv5Ar56A'
}).addTo(map);

createMarkers();

// create markers
function createMarkers() {
  var tripInfo = {};
  var markersInfo = [];
  db.collection("TripCollection").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      var data = doc.data();
      var country = data['the_country_i_am_traveling_to'];
      var weight = data["weight_lbs"] ? parseInt(data["weight_lbs"]) : 0;
      var suitcases = data["number_suitcases"] ? parseInt(data["number_suitcases"]) : 0;
      var existingCountry = tripInfo[country];

      // aggregate weight, suitcases, and trips for each country
      if (existingCountry) {
        existingCountry["weight"] += weight;
        existingCountry["suitcases"] += suitcases;
        existingCountry["trips"] += 1;
      } else if (country) { //ignore trips where country is not provided
        tripInfo[country] = { weight, suitcases, trips: 1 };
      }
    });

    // add information to GeoJSON properties
    countryCoords.forEach(country => {
      const countryName = country["country"];

      // add information if trip information exist for this country
      if (tripInfo[countryName]) {
        markersInfo.push({ ...tripInfo[countryName], ...country });
      }
    });

    // cluster markers
    var markers = L.markerClusterGroup();

    for (var i = 0; i < markersInfo.length; i++) {
      var markerInfo = markersInfo[i];
      var title = markerInfo["countryName"];
      var marker = L.marker(new L.LatLng(markerInfo["latitude"], markerInfo["longitude"]), { title: title });
      marker.bindPopup(title);
      markers.addLayer(marker);
    }

    map.addLayer(markers);

    console.log(markersInfo);
  });
}

function getTrips() {
  var tripInfo = {};
  db.collection("TripCollection").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      var data = doc.data();
      var country = data['the_country_i_am_traveling_to'];
      var weight = data["weight_lbs"] ? parseInt(data["weight_lbs"]) : 0;
      var suitcases = data["number_suitcases"] ? parseInt(data["number_suitcases"]) : 0;
      var existingCountry = tripInfo[country];

      // aggregate weight, suitcases, and trips for each country
      if (existingCountry) {
        existingCountry["weight"] += weight;
        existingCountry["suitcases"] += suitcases;
        existingCountry["trips"] += 1;
      } else if (country) { //ignore trips where country is not provided
        tripInfo[country] = { weight, suitcases, trips: 1 };
      }
    });

    // add information to GeoJSON properties
    countries["features"].forEach(feature => {
      var featureCountry = feature["properties"]["country"];

      // add information if trip information exist for this country
      if (tripInfo[featureCountry]) {
        feature["properties"] = { ...feature["properties"], ...tripInfo[featureCountry] }
      }
    });

    geojson = L.geoJson(countries, { style: style, onEachFeature: onEachFeature }).addTo(map);
    console.log({ tripInfo });
    console.log("done updating geoJSON");
    console.log({ countries });
  });
}

function getColor(trips) {
  if (trips === undefined) {
    return 'transparent';
  } else if (trips > 50) {
    return '#0e7261';
  } else if (trips > 40) {
    return '#139f88';
  } else if (trips > 30) {
    return '#19cdaf';
  } else if (trips > 20) {
    return '#32e6c8';
  } else if (trips > 10) {
    return '#60ecd4';
  } else {
    return '#8df1e1';
  }
}

function style(feature) {
  return {
    fillColor: getColor(feature.properties.trips),
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
  map.fitBounds(e.target.getBounds());
}

// add event handler on each country layers
function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    click: zoomToFeature
  });
}

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
  const { trips, suitcases, weight, country } = props || {};
  var infoHTML = '<h4>Total Donation</h4>';

  if (!props) {
    infoHTML += 'Hover over a country';
  } else if (trips || suitcases || weight) {
    infoHTML +=
      '<b>' + country + '</b>' +
      '<br />' + trips + (trips > 1 ? ' trips' : ' trip') +
      '<br />' + suitcases + (suitcases > 1 ? ' suitcases' : ' suitcase') +
      '<br />' + weight + (weight > 1 ? ' pounds' : ' pound');
  } else {
    infoHTML +=
      '<b>' + country + '</b>' +
      '<br /> No information';
  }

  this._div.innerHTML = infoHTML;
}

// add information box to map
info.addTo(map);

// create legend for colours
var legend = L.control({ position: 'bottomright' });

legend.onAdd = function (map) {
  // create a div with a class "info" and "legend"
  var div = L.DomUtil.create('div', 'info legend'),
    grades = [1, 10, 20, 30, 40, 50],
    labels = [];

  // add title
  div.innerHTML += '<h4> Number of Trips </h4>';

  // loop through our density intervals and generate a label with a colored square for each interval
  for (var i = 0; i < grades.length; i++) {
    div.innerHTML +=
      '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
      grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
  }
  return div;
};

legend.addTo(map);