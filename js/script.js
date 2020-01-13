
// Initialize firebase
firebase.initializeApp(FIREBASECONFIG);
var db = firebase.firestore();

db.collection("ClinicCollection").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    // console.log(`${doc.id} => ${doc.data()}`);
  });
});


var map;

function initMap() {
  geocoder = new google.maps.Geocoder();
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: { lat: -28, lng: 137 }
  });
  map.data.loadGeoJson('https://storage.googleapis.com/mapsdevsite/json/google.json');
  // codeAddress("Bangkok, Thailand");
};

function codeAddress(address) {
  geocoder.geocode({ address: address }, function (results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      //center the map over the result
      map.setCenter(results[0].geometry.location);

      //place a marker at the location
      var marker = new google.maps.Marker(
        {
          map: map,
          position: results[0].geometry.location
        });
      console.log({ results });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
};