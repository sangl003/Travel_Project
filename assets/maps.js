window.onload = getLocation

var map;
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(displayLocation);
    } else {
        // Modal Here
        alert("No Geolocation support")
    }
}

function displayLocation(position) {
    // Latitude and Longitude from HTML 5 API
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
}

// New object to combine positions for Google API
var latlon = new google.maps.latlon(lat, lon);

showMap(latlon)
addClosePlaces(latlon)
addAPIMarker(latlon)

function showMap(latlon) {
    // Set up map settings
    var mapOptions = {
        center: latlon,
        zoom: 14,
        mapTypeID: google.maps.MapTypeID.ROADMAP
    };
    // Creating map instance and assigning div element to render it
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
}

function addClosePlaces(latlon) {

    var nearbyService = new.google.maps.places.PlacesService(map);

    var request = {
        location: latlon,
        radius: 10934,
        types: ['bars', 'shopping', 'landmarks']
    };

    nearbyService.nearbySearch(request, searchNearby);
};

function searchNearby(results, status) {
    if(status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            var place = results[i];
            apiMarkerCreate(place.geometry.location, place);
        };
    }
};

function apiMarkerCreate(latlon, placeResult) {
    var markerOptions = {
        position: latlon,
        map: map,
        animation: google.maps.Animation.DROP,
        clickable: true
    }

    var marker = new.google.maps.Marker(markerOptions);
}
