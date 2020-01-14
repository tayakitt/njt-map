
// Initialize firebase
firebase.initializeApp(FIREBASECONFIG);
var db = firebase.firestore();

var locations = [
  {
    "Country": "Havana Cuba",
    "lat": 23.1135925,
    "lng": -82.3665956,
    "weight": 4.609635769164344
  },
  {
    "Country": "Kathmandu, Nepal",
    "lat": 27.7172453,
    "lng": 85.3239605,
    "weight": 48.03133932541901
  },
  {
    "Country": "Havana Cuba",
    "lat": 23.1135925,
    "lng": -82.3665956,
    "weight": 75.32511792491763
  },
  {
    "Country": "Varadero Cuba",
    "lat": 23.179858,
    "lng": -81.1885293,
    "weight": 50.101881732378814
  },
  {
    "Country": "Cuba",
    "lat": 21.521757,
    "lng": -77.781167,
    "weight": 94.88840545885657
  },
  {
    "Country": "Santa Clara Cuba",
    "lat": 22.424398,
    "lng": -79.9416549,
    "weight": 55.968014044954074
  },
  {
    "Country": "Santa Lucia, Cuba",
    "lat": 21.5623066,
    "lng": -77.0432,
    "weight": 18.841332046756364
  },
  {
    "Country": "Pilon Cuba",
    "lat": 19.9156962,
    "lng": -77.3266991,
    "weight": 8.87924181808989
  },
  {
    "Country": "Havana Cuba",
    "lat": 23.1135925,
    "lng": -82.3665956,
    "weight": 94.43721946928105
  },
  {
    "Country": "Havana Cuba",
    "lat": 23.1135925,
    "lng": -82.3665956,
    "weight": 68.96790648324334
  },
  {
    "Country": "Varadero Cuba",
    "lat": 23.179858,
    "lng": -81.1885293,
    "weight": 84.14229824160215
  },
  {
    "Country": "Madagascar",
    "lat": -18.766947,
    "lng": 46.869107,
    "weight": 64.61424393489035
  },
  {
    "Country": "Haputale, Sri Lanka",
    "lat": 6.7654136,
    "lng": 80.9525654999999,
    "weight": 65.82151982764307
  },
  {
    "Country": "Mexico",
    "lat": 23.634501,
    "lng": -102.552784,
    "weight": 79.67318897818737
  },
  {
    "Country": "Varadero,Cuba",
    "lat": 23.179858,
    "lng": -81.1885293,
    "weight": 51.33123926677145
  },
  {
    "Country": "Holguin, Cuba",
    "lat": 20.8795129,
    "lng": -76.2594981,
    "weight": 16.80387829154918
  },
  {
    "Country": "Boquette, Panama",
    "lat": 8.7772318,
    "lng": -82.4481944,
    "weight": 15.728274890243787
  },
  {
    "Country": "Santiago Cuba",
    "lat": 20.01693,
    "lng": -75.8301537,
    "weight": 25.362549877239417
  },
  {
    "Country": "Dumaguete, Philippines,  Through Cebu",
    "lat": 9.3068402,
    "lng": 123.3054467,
    "weight": 34.75420568537055
  },
  {
    "Country": "Punta Cana Dominican Republic",
    "lat": 18.5600761,
    "lng": -68.372535,
    "weight": 4.690759948183065
  },
  {
    "Country": "Holguin Cuba",
    "lat": 20.8795129,
    "lng": -76.2594981,
    "weight": 47.747257340145225
  },
  {
    "Country": "Roatan Honduras",
    "lat": 16.3297608,
    "lng": -86.5299673,
    "weight": 43.767068837815934
  },
  {
    "Country": "Mumbai India",
    "lat": 19.0759837,
    "lng": 72.8776559,
    "weight": 76.06629681044366
  },
  {
    "Country": "Santiago de Cuba, Cuba",
    "lat": 20.01693,
    "lng": -75.8301537,
    "weight": 22.517193777491727
  },
  {
    "Country": "Jibacoa, Cuba",
    "lat": 23.1149038,
    "lng": -81.8757018,
    "weight": 58.189428164904434
  },
  {
    "Country": "Varadero Cuba",
    "lat": 23.179858,
    "lng": -81.1885293,
    "weight": 22.833416778848193
  },
  {
    "Country": "Dar Es Salaam",
    "lat": -6.792354,
    "lng": 39.2083284,
    "weight": 6.89295358257408
  },
  {
    "Country": "Cartagena, Colombia",
    "lat": 10.3910485,
    "lng": -75.4794257,
    "weight": 5.5896425118465825
  },
  {
    "Country": "Remedios Cuba",
    "lat": 22.4963477,
    "lng": -79.5462943,
    "weight": 41.656940218951455
  },
  {
    "Country": "Varadero Cuba",
    "lat": 23.179858,
    "lng": -81.1885293,
    "weight": 38.516997363198016
  },
  {
    "Country": "Punta Cana Domincan Republic",
    "lat": 18.5600761,
    "lng": -68.372535,
    "weight": 11.326153093793623
  },
  {
    "Country": "Chivirico, Cuba",
    "lat": 19.9782723,
    "lng": -76.4071336,
    "weight": 76.40227580112158
  },
  {
    "Country": "Punta Cana Dominican Republic",
    "lat": 18.5600761,
    "lng": -68.372535,
    "weight": 54.03624474770956
  },
  {
    "Country": "Varadero Cuba",
    "lat": 23.179858,
    "lng": -81.1885293,
    "weight": 25.175987048268844
  },
  {
    "Country": "Chiang Mai, Thailand",
    "lat": 18.7952876,
    "lng": 98.9620001999999,
    "weight": 69.76492589718983
  },
  {
    "Country": "SAMANA, DOMINICAN REPUBLIC",
    "lat": 19.2030757,
    "lng": -69.3387664,
    "weight": 73.3690174316783
  },
  {
    "Country": "Punta Cana, DOMINICAN REPUBLIC",
    "lat": 18.5600761,
    "lng": -68.372535,
    "weight": 27.167857632716263
  },
  {
    "Country": "Manila, Philippines",
    "lat": 14.5995124,
    "lng": 120.9842195,
    "weight": 64.25044242380176
  },
  {
    "Country": "St Vincent and the Grenadines ",
    "lat": 12.984305,
    "lng": -61.287228,
    "weight": 32.504129738547775
  },
  {
    "Country": "St Vincent and the Grenadines ",
    "lat": 12.984305,
    "lng": -61.287228,
    "weight": 58.63932796780759
  },
  {
    "Country": "Varadero, Cuba",
    "lat": 23.179858,
    "lng": -81.1885293,
    "weight": 41.6533581762595
  },
  {
    "Country": "St.Vincent and the Grenadines",
    "lat": 12.984305,
    "lng": -61.287228,
    "weight": 8.64898604176102
  },
  {
    "Country": "Belize",
    "lat": 17.189877,
    "lng": -88.49765,
    "weight": 53.99491992941164
  },
  {
    "Country": "Ethiopia",
    "lat": 9.145,
    "lng": 40.489673,
    "weight": 16.02371355168882
  },
  {
    "Country": "Ethiopia",
    "lat": 9.145,
    "lng": 40.489673,
    "weight": 42.09220711469067
  },
  {
    "Country": "Bequia, St. Vincent and the Grenadines",
    "lat": 13.0117059,
    "lng": -61.2272312,
    "weight": 82.62882575550108
  },
  {
    "Country": "Holguin, Cuba",
    "lat": 20.8795129,
    "lng": -76.2594981,
    "weight": 16.844934736139372
  },
  {
    "Country": "Holguin, Cuba",
    "lat": 20.8795129,
    "lng": -76.2594981,
    "weight": 5.230757645847495
  },
  {
    "Country": "India",
    "lat": 20.593684,
    "lng": 78.96288,
    "weight": 22.498034385680466
  },
  {
    "Country": "Varadero Cuba",
    "lat": 23.179858,
    "lng": -81.1885293,
    "weight": 9.943153755447852
  },
  {
    "Country": "Cartago,Costa Rica",
    "lat": 9.8638091,
    "lng": -83.9161934999999,
    "weight": 88.39571487524057
  },
  {
    "Country": "Cartago,Costa Rica",
    "lat": 9.8638091,
    "lng": -83.9161934999999,
    "weight": 34.418208933647
  },
  {
    "Country": "Cartago,Costa Rica",
    "lat": 9.8638091,
    "lng": -83.9161934999999,
    "weight": 18.726046237301684
  },
  {
    "Country": "Cartago,Costa Rica",
    "lat": 9.8638091,
    "lng": -83.9161934999999,
    "weight": 26.643263822720563
  },
  {
    "Country": "Cartago,Costa Rica",
    "lat": 9.8638091,
    "lng": -83.9161934999999,
    "weight": 82.10938590826609
  },
  {
    "Country": "Belize",
    "lat": 17.189877,
    "lng": -88.49765,
    "weight": 49.48650422247963
  },
  {
    "Country": "Varadero Cuba",
    "lat": 23.179858,
    "lng": -81.1885293,
    "weight": 19.450257745478993
  },
  {
    "Country": "Varadero Cuba",
    "lat": 23.179858,
    "lng": -81.1885293,
    "weight": 29.16099199837777
  },
  {
    "Country": "Santa Clara, Cuba",
    "lat": 22.424398,
    "lng": -79.9416549,
    "weight": 41.0162329761471
  },
  {
    "Country": "Santa Clara, Cuba",
    "lat": 22.424398,
    "lng": -79.9416549,
    "weight": 15.593833523371249
  },
  {
    "Country": "Kathmandu Nepal ",
    "lat": 27.7172453,
    "lng": 85.3239605,
    "weight": 47.56129321499918
  },
  {
    "Country": "Holguin, Cuba",
    "lat": 20.8795129,
    "lng": -76.2594981,
    "weight": 93.16036413719377
  },
  {
    "Country": "Rwanda",
    "lat": -1.940278,
    "lng": 29.873888,
    "weight": 21.119256445044332
  },
  {
    "Country": "Punta Cana, Dominican Republic",
    "lat": 18.5600761,
    "lng": -68.372535,
    "weight": 84.04766071489718
  },
  {
    "Country": "Cuba",
    "lat": 21.521757,
    "lng": -77.781167,
    "weight": 69.81246857444488
  },
  {
    "Country": "Manilla Philippine",
    "lat": 14.5995124,
    "lng": 120.9842195,
    "weight": 74.13564156245424
  },
  {
    "Country": "Occidental Mindoro, Philippines",
    "lat": 13.1024111,
    "lng": 120.7651284,
    "weight": 28.921364992974276
  },
  {
    "Country": "Occidental Mindoro, Philippines",
    "lat": 13.1024111,
    "lng": 120.7651284,
    "weight": 96.02837812933444
  },
  {
    "Country": "Kosovo",
    "lat": 42.6026359,
    "lng": 20.902977,
    "weight": 64.12399429405131
  },
  {
    "Country": "Venezuela, Monagas ",
    "lat": 9.3241652,
    "lng": -63.0147578,
    "weight": 66.84619640465405
  },
  {
    "Country": "Sri Lanka",
    "lat": 7.87305399999999,
    "lng": 80.7717969999999,
    "weight": 59.13538745688424
  },
  {
    "Country": "Varadero Cuba",
    "lat": 23.179858,
    "lng": -81.1885293,
    "weight": 73.52658345158073
  },
  {
    "Country": "Varadero Cuba",
    "lat": 23.179858,
    "lng": -81.1885293,
    "weight": 11.16209567274229
  },
  {
    "Country": "Punta Cana, Dominican Republic",
    "lat": 18.5600761,
    "lng": -68.372535,
    "weight": 57.416979144494775
  },
  {
    "Country": "Varadero,Cuba",
    "lat": 23.179858,
    "lng": -81.1885293,
    "weight": 86.15662151774788
  },
  {
    "Country": "St. Vincents",
    "lat": 37.3401932,
    "lng": -95.2515619999999,
    "weight": 87.42620775761442
  },
  {
    "Country": "Cuba",
    "lat": 21.521757,
    "lng": -77.781167,
    "weight": 79.64190032679709
  },
  {
    "Country": "Cuba",
    "lat": 21.521757,
    "lng": -77.781167,
    "weight": 49.29655973342212
  },
  {
    "Country": "Santa Clara, Cuba",
    "lat": 22.424398,
    "lng": -79.9416549,
    "weight": 86.02215175397716
  },
  {
    "Country": "Cairo, Egypt",
    "lat": 30.0444196,
    "lng": 31.2357116,
    "weight": 72.84155527169102
  },
  {
    "Country": "Paete Laguna, Philippines",
    "lat": 14.367518,
    "lng": 121.5299539,
    "weight": 43.25999202007148
  },
  {
    "Country": "Somalia",
    "lat": 5.152149,
    "lng": 46.199616,
    "weight": 82.25308375285448
  },
  {
    "Country": "Kingston, Jamaica",
    "lat": 18.0178743,
    "lng": -76.8099041,
    "weight": 4.350718365407724
  },
  {
    "Country": "Havana Cuba",
    "lat": 23.1135925,
    "lng": -82.3665956,
    "weight": 82.61702838369976
  },
  {
    "Country": "Nigeria",
    "lat": 9.081999,
    "lng": 8.675277,
    "weight": 1.2445338811925777
  },
  {
    "Country": "Santa Clara Cuba",
    "lat": 22.424398,
    "lng": -79.9416549,
    "weight": 92.20167496196468
  },
  {
    "Country": "Las Pajaas Batey, Dominican Republic",
    "lat": 18.6198618,
    "lng": -69.3696992,
    "weight": 40.151441356667995
  },
  {
    "Country": "Dominica",
    "lat": 15.414999,
    "lng": -61.370976,
    "weight": 31.324175351153706
  },
  {
    "Country": "Barbuda",
    "lat": 17.6266242,
    "lng": -61.7713027999999,
    "weight": 74.21790302293776
  },
  {
    "Country": "st. Vincents",
    "lat": 37.3401932,
    "lng": -95.2515619999999,
    "weight": 78.89518843090737
  },
  {
    "Country": "Ghana",
    "lat": 7.946527,
    "lng": -1.023194,
    "weight": 85.40923744255835
  },
  {
    "Country": "Ghana",
    "lat": 7.946527,
    "lng": -1.023194,
    "weight": 84.1414119107053
  },
  {
    "Country": "Colombia",
    "lat": 4.570868,
    "lng": -74.297333,
    "weight": 12.398842182281333
  },
  {
    "Country": "Ecuador",
    "lat": -1.831239,
    "lng": -78.1834059999999,
    "weight": 58.37342259433
  }
]


var map;

function initMap() {
  geocoder = new google.maps.Geocoder();
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: { lat: 37.4419, lng: -122.1419 }
  });
  // map.data.loadGeoJson('https://storage.googleapis.com/mapsdevsite/json/google.json');
  // codeAddress("Bangkok, Thailand");
  // setHeatMap();
  setClusterMarkers();
};

// use GeoCoder API to get lat and lng of address
function getLatLng(address) {
  geocoder.geocode({ address: address }, function (results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      console.log({ results });
      return {
        lat: results[0].geometry.location.lat(),
        lng: results[0].geometry.location.lng(),
      }
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
};

function setClusterMarkers() {
  // create marker for each lat and lng
  var markers = locations.map(location => {
    var marker = new google.maps.Marker({
      position: {
        lat: location["lat"],
        lng: location["lng"],
      }
    });

    var infoHtml = '<div id="content">' +
      '<h1>' +
      "lbs of medical supply donated: " +
      location["weight"] +
      '</h1>' +
      '</div>';

    // Information on marker click
    var infowindow = new google.maps.InfoWindow({
      content: infoHtml
    });

    marker.addListener('click', function () {
      infowindow.open(map, marker);
    });

    return marker;
  });

  // Add a marker clusterer to manage the markers.
  var markerCluster = new MarkerClusterer(map, markers,
    {
      imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
      maxZoom: 7,
      zoomOnClick: true,
    });
}

function setHeatMap() {
  var heatMapData = [];
  // db.collection("TripCollection").get().then((querySnapshot) => {
  //   querySnapshot.forEach((doc) => {
  //     var data = doc.data();
  //     var latLng = getLatLng(data.country);
  //     console.log({ latLng });
  //     // heatMapData.append(new google.maps.LatLng(latLng.lat, latLng.lng));
  //   });
  // });
  locations.forEach((location) => {
    heatMapData.push({
      location: new google.maps.LatLng(location["lat"], location["lng"]),
      weight: location["weight"],
    });
  });
  var heatmap = new google.maps.visualization.HeatmapLayer({
    data: heatMapData
  });
  heatmap.setMap(map);
}

function buildGeoJSON() {
  geoJSON = {
    type: "FeatureCollection",
    features: []
  }

  return geoJSON;
};

function buildFeature(props, coords) {
  return {
    type: "Feature",
    properties: props,
    geometry: {
      type: "Polygon",
      coordinates: [coords]
    }
  }
}