var map;
var markers = [];

// Locations Data
const locations = [
  {title: "Park Ave Penthouse", location: {lat: 40.7713024, lng: -73.9632393}},
  {title: "Chelsea Loft", location: {lat: 40.7444883, lng: -73.9949465}},
  {title: "Union Square Open Floor Plan", location: {lat: 40.7347062, lng: -73.9895759}},
  {title: "East Village Hip Studio", location: {lat: 40.7281777, lng: -73.984377}},
  {title: "TriBeCa Artsy Bachelor Pad", location: {lat: 40.7195264, lng: -74.0089934}},
  {title: "Chinatown Homey Space", location: {lat: 40.7180628, lng: -73.9961237}},
  {title: "Empire State Building", location: {lat: 40.748817, lng: -73.985428}},
];

// Setup map
function initMap() {
	const home = {lat: 40.7444883, lng: -73.9949465},
	map = new google.maps.Map(document.getElementById("map"), {
    zoom: 13,
    center: home,
    styles: [
      {
          "featureType": "all",
          "elementType": "labels",
          "stylers": [
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "all",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "saturation": 36
              },
              {
                  "color": "#000000"
              },
              {
                  "lightness": 40
              }
          ]
      },
      {
          "featureType": "all",
          "elementType": "labels.text.stroke",
          "stylers": [
              {
                  "visibility": "on"
              },
              {
                  "color": "#000000"
              },
              {
                  "lightness": 16
              }
          ]
      },
      {
          "featureType": "all",
          "elementType": "labels.icon",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "administrative",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#000000"
              },
              {
                  "lightness": 20
              }
          ]
      },
      {
          "featureType": "administrative",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "color": "#000000"
              },
              {
                  "lightness": 17
              },
              {
                  "weight": 1.2
              }
          ]
      },
      {
          "featureType": "landscape",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#000000"
              },
              {
                  "lightness": "20"
              },
              {
                  "gamma": "1.04"
              },
              {
                  "saturation": "0"
              }
          ]
      },
      {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#000000"
              },
              {
                  "lightness": 21
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#000000"
              },
              {
                  "lightness": 17
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "color": "#000000"
              },
              {
                  "lightness": 29
              },
              {
                  "weight": 0.2
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "labels",
          "stylers": [
              {
                  "visibility": "off"
              },
              {
                  "lightness": "-64"
              },
              {
                  "saturation": "-100"
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "labels.icon",
          "stylers": [
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "road.arterial",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#000000"
              },
              {
                  "lightness": "17"
              }
          ]
      },
      {
          "featureType": "road.arterial",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "road.arterial",
          "elementType": "labels",
          "stylers": [
              {
                  "weight": "2.12"
              },
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "road.local",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#000000"
              },
              {
                  "lightness": "18"
              },
              {
                  "visibility": "on"
              },
              {
                  "weight": "2.17"
              }
          ]
      },
      {
          "featureType": "road.local",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "visibility": "off"
              },
              {
                  "lightness": "-32"
              }
          ]
      },
      {
          "featureType": "road.local",
          "elementType": "labels",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "transit",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#000000"
              },
              {
                  "lightness": 19
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#282529"
              },
              {
                  "saturation": "-49"
              },
              {
                  "lightness": "-9"
              }
          ]
      }
    ]
  });

  // Iterate through locations array
    // Creating new market for each iteration.
  markers = locations.map(function(location, i) {
    return new google.maps.Marker({
      title: locations[i].title,
      position: locations[i].location,
      animation: google.maps.Animation.DROP
    });
  });
  // Create infowindow object.
  let infowindow = new google.maps.InfoWindow();
  // Loop through markers array.
  // Open infowindow on marker click event.
  for (let i = 0; i < markers.length; i++) {
    markers[i].addListener("click", function() {
      infowindow.setContent(markers[i].title);
      infowindow.open(map, markers[i]);
    });
  }
  // Store crowded markers within marker cluster icon.
  const markerCluster = new MarkerClusterer(map, markers, { imagePath: "img/m" });
}

// ViewModel
var ViewModel = function() {
  // Assigns `this` always to parent function.
  var self = this;

  // Captures user0 input.
  self.userInput = ko.observable();

  self.locations = ko.observableArray([
    { name: "Bungle", type: "Bear" },
    { name: "George", type: "Hippo" },
    { name: "Zippy", type: "Unknown" }
  ]);



  for (var i = 0; i < self.locations(); i++) {
    if (self.locations()[0].indexOf("b") > -1) {
      console.log( self.locations()[0] );
    }
  }


  self.filterLocations = ko.computed(function() {
    return self.locations();
  }, self)

  // Alerts the list locations title on click.
  self.selectLocation = function(location) {
    alert(location.title);
  }

}

ko.applyBindings(new ViewModel());




// if (a.innerHTML.toUpperCase().indexOf(filter) > -1)



