
// Initialize firebase
firebase.initializeApp(FIREBASECONFIG);
var db = firebase.firestore();

db.collection("ClinicCollection").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
  });
});

var mymap = L.map('mapid').setView([51.505, -0.09], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidGF5YWtpdHQiLCJhIjoiY2s1Y284Ym9hMW50ODNnbzMwbHBmaHR1eiJ9._DGyRf1U27iZwnGv5Ar56A', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox/streets-v11',
  accessToken: 'your.mapbox.access.token'
}).addTo(mymap);