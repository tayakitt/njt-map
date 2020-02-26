
// Initialize firebase
firebase.initializeApp(FIREBASECONFIG);
var db = firebase.firestore();

// create map and set center lat & lng
var map = L.map('map').setView([21.0079, 10.9408], 2);

// use mapBox as the base map provider
L.tileLayer.provider('MapBox', {
  accessToken: 'pk.eyJ1Ijoibm90anVzdHRvdXJpc3RzIiwiYSI6ImNrNnNkdXpoZjBmczIzbHJ6b2o4dWRpbHUifQ.UxdIRTjyU6ZVjpLazAZFvw'
}).addTo(map);

// create markers layer
createMarkers();

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

    // combine tripInfo with markersInfo
    countryCoords.forEach(country => {
      const countryName = country["country"];

      // only mark countries with suitcases > 0
      if (tripInfo[countryName] && tripInfo[countryName]["suitcases"] > 0) {
        markersInfo.push({ ...tripInfo[countryName], ...country });
      }
    });

    // initialize marker cluster group
    var markers = L.markerClusterGroup({
      showCoverageOnHover: false,
      iconCreateFunction: function (cluster) {
        var markers = cluster.getAllChildMarkers();
        var clusterSuitcases = 0;

        // count suitcases in the cluster
        for (var i = 0; i < markers.length; i++) {
          clusterSuitcases += markers[i]["options"]["suitcases"];
        }

        // determine marker style
        var c = ' marker-cluster-';
        if (clusterSuitcases < 10) {
          c += 'small';
        } else if (clusterSuitcases < 100) {
          c += 'medium';
        } else {
          c += 'large';
        }

        return new L.DivIcon({ html: '<div><span>' + clusterSuitcases + '</span></div>', className: 'marker-cluster' + c, iconSize: new L.Point(40, 40) });
      },
    });

    // create each marker
    for (var i = 0; i < markersInfo.length; i++) {
      var markerInfo = markersInfo[i];

      var marker = L.marker(
        new L.LatLng(markerInfo["latitude"], markerInfo["longitude"]),
        {
          suitcases: markerInfo["suitcases"] || 0
        }
      );

      // marker tooltip
      marker.bindPopup(`<b> ${markerInfo["suitcases"]} suitcases were donated in ${markerInfo["country"]} </b>`);

      // show or hide marker on hover
      marker.on('mouseover', function (e) {
        this.openPopup();
      });
      marker.on('mouseout', function (e) {
        this.closePopup();
      });
      markers.addLayer(marker);
    }

    // add markers layer to map
    map.addLayer(markers);
  });
}