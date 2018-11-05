var map;
var largeInfowindow;
const markers = [];
// Model for locations data.
const locations = [
    {title: "Taj Mahal", location: {lat: 27.175014, lng: 78.042152}},
    {title: "Eiffel Tower", location: {lat: 48.858372, lng: 2.294481}},
    {title: "Stonehenge", location: {lat: 51.178883, lng: -1.826215}},
    {title: "Statue of liberty", location: {lat: 40.689247, lng: -74.044502}},
    {title: "Berlin Wall", location: {lat: 52.463661, lng: 13.134080}},
    {title: "Big Ben", location: {lat: 51.500690, lng: -0.124584}},
    {title: "Empire State Building", location: {lat: 40.748817, lng: -73.985428}},
    {title: "Masjid al-Haram", location: {lat: 21.386740, lng: 39.901110}},
    {title: "Great Wall of China", location: {lat: 40.431908, lng: 116.570374}},
    {title: "Angkor Thom", location: {lat: 13.588110, lng: 103.885860}},
    {title: "Acropolis", location: {lat: 37.9715, lng: 23.7257}},
    {title: "Chiang Kai-shek Memorial Hall", location: {lat: 53.099500, lng: -0.536220}},
    {title: "Potala Palace", location: {lat: -33.696130, lng: 151.285450}},
    {title: "Sultan Ahmed Mosque", location: {lat: 30.536590, lng: 31.014200}},
    {title: "Grand Canyon", location: {lat: 36.106964, lng: -112.112999}},
]


// Initializes Google Map.
function initMap() {
  // Create Google Map
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.689247, lng: -74.044502},
    zoom: 13,
    mapTypeControl: false,
    styles: [
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
                "color": "#363636"
            },
            {
                "lightness": 1
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
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 18
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
                "lightness": 16
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
                "color": "#242224"
            },
            {
                "lightness": 1
            }
        ]
    }
]
  });

  largeInfowindow = new google.maps.InfoWindow();
  // Creates map markers.
  for (let i = 0; i < locations.length; i++) {
    // Get location data.
    var position = locations[i].location;
    var title = locations[i].title;
    // Create a marker per location, and put into markers array.
    var marker = new google.maps.Marker({
      position: position,
      title: title,
      map: map,
      animation: google.maps.Animation.DROP,
      icon: "/img/pin_light.png",
      id: i
    });
    // Push newly created marker to markers array.
    markers.push(marker);
  }

  // Populate marker infowindow on click.
  for (let i = 0; i < markers.length; i++) {
    markers[i].addListener('click', function() {
      populateInfoWindow(this, largeInfowindow);
    });
  }

  ko.applyBindings(new viewModel());
}


// Template for making ajax calls.
function getJSON(url) {
  return new Promise(function(resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onreadystatechange = handleResponse;
    xhr.onerror = function(error) { reject(error); };
    xhr.send();

    function handleResponse() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          resolve(data);
        } else {
          reject(this.statusText);
          displayErrorMsg();
        }
      }
    }
  });
}

function displayErrorMsg(Errdeets) {
  console.log(Errdeets);
  $(".errorMessage").slideDown(300);
  if (Errdeets) {
    $("#details").on("click", function() {
      alert(Errdeets);
    });
  }
  // close error message click button
  $("#closeError").on("click", function() {
    $(".errorMessage").slideUp(300);
  });
}

// Displays error message
window.onerror = function(error) {
  //save error and send to server for example.
  displayErrorMsg(error);
};


// Constructs an infowindow on marker click with each markers corresponding content.
function populateInfoWindow(marker, infowindow) {
  // Check to make sure the infowindow is not already opened on this marker.
  if (infowindow.marker != marker) {

    const ajaxPromise = getJSON('https://en.wikipedia.org/api/rest_v1/page/summary/' + marker.title);

    // Give marker animation
    marker.setAnimation( google.maps.Animation.BOUNCE );
    setTimeout(function() {
      marker.setAnimation( null );
    }, 1000);

    ajaxPromise.then(function(data) {

      // Shorten length of description
      var trimmedDescription = data.extract.substring(0, 200);

      // Set the content of the markers infowindow.
      infowindow.setContent(
        '<div class="infoWindow">' +
          '<img class="locationPic" src=' + data.originalimage.source + ' alt=' + data.title + '>' +
          '<div>' +
            '<h3>' + data.displaytitle + '</h3>' +
            '<p>' + trimmedDescription + '... ' + '</p>' +
            '<a href=' + data.content_urls.desktop.page + ' target="_blank">Continue reading' +  '<span><img src="' + "https://cdn3.iconfinder.com/data/icons/keyboard/100/237278-Keyboard_right-512.png" + '" alt="arrow-right"</span>' + '</a>' +
          '</div>' +
        '</div>'
        );
      // Open the infowindow on the correct marker.
      infowindow.open(map, marker);
    }).catch(function(error) {
      displayErrorMsg(error);
    });
  }
}


// ViewModel.
const viewModel = function() {
  const self = this;
  self.userInput = ko.observable("");
  self.myLocations = ko.observableArray();

  self.showList = function() {
    $("#locations-list").toggle();
  }

  // Push markers to obserable array.
  for (var i = 0; i < markers.length; i++) {
    self.myLocations.push(markers[i])
  }

  // Filter Marker
  self.filteredLocations = ko.computed(function() {
    var filter = self.userInput().toUpperCase();
    if (!filter) {
      self.myLocations().forEach(function(locations){
        locations.setVisible(true);
      });
      return self.myLocations(); // Sets location visible on load
    } else {
      return ko.utils.arrayFilter(self.myLocations(), function(locations) {
        var selected = locations.title.toUpperCase().indexOf(filter) == 0;
          locations.setVisible(selected);
          return selected;
      })
    }}, self);
}

