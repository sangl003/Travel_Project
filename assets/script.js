// Initialize Firebase
// var config = {
//   apiKey: "AIzaSyDnsfwc_F6xp0rx4esMlSBUuACbHJG9itc",
//   authDomain: "project-1-userinput.firebaseapp.com",
//   databaseURL: "https://project-1-userinput.firebaseio.com",
//   projectId: "project-1-userinput",
//   storageBucket: "project-1-userinput.appspot.com",
//   messagingSenderId: "32436368046"
// };
// firebase.initializeApp(config);
// Google places API KEY: AIzaSyDBufjD9u_vKD1khDCHUIOj8dnwPYsF2cc
// ------------------------------------------ CHECK LIST ------------------------------------------
// ----------- Dropdown Menu-----------
// Assigned: Joe
// [x] Predefined list of 4-6 things (i.e. restaurants, landmarks, parks etc)
// [x] The list expands on user input for the last 3 searches, using firebase to store values
// [ ] Drop down to create dynamic favorite list
// [ ] Results div to display list of responses
// -------------- Map View --------------
// Assigned:
// [ ] Google maps to be displayed in a Mapview div spanning 70% of screen
// [ ] Zoom in and Zoom out functionality
// [ ] Location button to determine users location
// [ ] Info buttons on points of interest? - Google Places API ref
// ---------- Table Creation ----------
// Assigned:
// [ ] Creating a table below the displayed map
// [ ] Reviews and distance are displayed on the table
// Optional Additions (If we have time)
// Assigned:
// ----------- Weather Display ---------
// [ ] Weather display in the top-right corner? 
//      keep this simple as it's not core of our app
// -------------------------------- GLOBAL VARIABLES (CAPS PLEASE) --------------------------------
var DROPDOWNITEMS = []; 
// Will append more if user wants to search for other things
// ------------------------------------------- FUNCTIONS ------------------------------------------
/* NEEDS TO BE done
// Components of the Query
const api_KEY = "";
// When one of the dropdown items is selected
function displayLocationsInfo() {
  // To remove previous images if there was any
  $(".person").remove();
  var search = "&q=" + $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=HXjPGl9EXf7b9vTRgGNZtlOIpWa3cQBm" + search + limit + rating;
  // Creating an AJAX call for the specific
  $.ajax({
      url: queryURL,
      method: "GET"
  }).then(function(response) {
      
  });
} */

// Adding a div so the dropdown items are not clustered into one
function addDiv() {
  $("#container").append($smallDiv.clone());
}

// String conversion where it uppercases every first letter of the string
// https://stackoverflow.com/questions/32589197/capitalize-first-letter-of-each-word-in-a-string-javascript/32589256
function upperCaseFirstLetterInString(str) {
  var splitStr = str.toLowerCase().split(' ');
  for (var i = 0; i < splitStr.length; i++) {
      // You do not need to check if i is larger than splitStr length, as your for does that for you
      // Assign it back to the array
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
  }
  // Directly return the joined string
  return splitStr.join(' '); 
}
// To dynamically render new dropdowns if they were added
function renderDropDownMenu() {
  // Deleting the list prior to adding in more searches
  // (this is necessary otherwise you will have repeat buttons)
  $("#newly-added-drop-down-btns").empty();
  // Looping through the array of people and characters
  for (var i = 0; i < DROPDOWNITEMS.length; i++) {
      // Then dynamically generating buttons for each search in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var a = $("<a>");
      // Adding a class of search-btn to our button, and some styling
      a.addClass("dropdown-item");
      // Adding a data-attribute
      a.attr("data-name", DROPDOWNITEMS[i]);
      // Providing the initial button text
      a.text(DROPDOWNITEMS[i]);
      // Adding the button to the buttons-view div
      $("#newly-added-drop-down-btns").append(a);
  }
}
// This function will add what was searched to the dropdown menu if it was not already in the list
$("#add-search").on("click", function(event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var search = $("#search-input").val().trim();
  // Alert since this was already in the array
  if (DROPDOWNITEMS.length < 3) {
    // If the search by the user is already in the array an alert appears
    if (DROPDOWNITEMS.includes(search)){
        alert("Search is already in the dropdown");
    }
    // If the function includes() fails then we try another way of checking for a duplicate string
    else {
        var isTrue = false;
        // isTrue returns true if EXACT string found in the array
        for (let n = 0; n < DROPDOWNITEMS.length; n++) {
            if (search.toUpperCase() === DROPDOWNITEMS[n].toUpperCase()) {
                isTrue = isTrue || true;
            } else {
                isTrue = isTrue || false;
            }
        }
        // Just alerts the user if the string was already in the array
        // Otherwise if word does not match array then it is added to the array
        if (isTrue) {
            alert("Search is already in the dropdown");
        } else {
          // Converts the string so that only the first letter in the string is capitalized
          let convertedStr = upperCaseFirstLetterInString(search);
          DROPDOWNITEMS.push(convertedStr);
        }
    }
  } else { // If the DROPDOWNITEMS.length reaches 4 we will only give the user 3 searches unless they remove some before adding more searches
    alert("Search limit has been reached, please close out some the searches in the dropdown");
  }
  // Calling renderButtons which handles the processing of our search array
  renderDropDownMenu();
  // Clearing input after the search is added
  document.getElementById("search-input").value= "";
});

// When selecting a dropdown item it will display locations on the map
/*$(document).on("click", ".dropdown-item", displayLocationsInfo);
// Deletes the dropdown item that the user wants to remove
$(document).on('click','.delete-item', function(){
  $(this).remove();
})*/

/* Note: This example requires that you consent to location sharing when
prompted by your browser. If you see the error "The Geolocation service
failed.", it means you probably did not give permission for the browser to
locate you. */

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

var map;

function initMap() {
  // Create the map.
  var minneapolis = {lat:44.970, lng: -93.244};

  map = new google.maps.Map(document.getElementById('map'), {
    center: minneapolis,
    zoom: 17
  });
  
  infoWindow = new google.maps.InfoWindow;
  var service = new google.maps.places.PlacesService(map);
  var getNextPage = null;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        // var service = new google.maps.places.PlacesService(map);

        infoWindow.setPosition(pos);
        infoWindow.setContent('Location found.');
        infoWindow.open(map);
        map.setCenter(pos);        
        console.log(pos);
      
      service.nearbySearch(     
      {
        location: pos, radius: 500, type: ['store']
      },
        function(results, status, pagination) {
        if (status !== 'OK') return;

        createMarkers(results);
        // moreButton.disabled = !pagination.hasNextPage;
        // getNextPage = pagination.hasNextPage && function() {
        //   pagination.nextPage();
        // };
      });
      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
        
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }

  // Create the places service.
  
  // var moreButton = document.getElementById('more');
  // moreButton.onclick = function() {
  //   moreButton.disabled = true;
  //   if (getNextPage) getNextPage();
  // };

  // Perform a nearby search.

}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
} // End of handleLocationError function


function createMarkers(places) {
  var bounds = new google.maps.LatLngBounds();
  var placesList = document.getElementById('places');



  for (var i = 0, place; place = places[i]; i++) {
    var image = {
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25)
    };

    var marker = new google.maps.Marker({
      map: map,
      icon: image,
      title: place.name,
      position: place.geometry.location
    });

    // var li = document.createElement('li');
    // li.textContent = place.name;
    // placesList.appendChild(li);

    bounds.extend(place.geometry.location);
  }
  map.fitBounds(bounds);
}


var getWeather = function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      lat: position.coords.latitude
      lng: position.coords.longitude
    });
  };
  var queryURL = `https://api.weather.gov/points/${lat},${lng}` 
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response["properties"]["relativeLocation"]["properties"]["city"]);
    console.log(response["properties"]["relativeLocation"]["properties"]["state"]);
    console.log(response["properties"]["forecast"]);
    var queryURL_1 = response["properties"]["forecast"];
    $.ajax({
      url: queryURL_1,
      method: "GET"
    }).then(function(response) {
      console.log(response["properties"]["periods"][0]["temperature"]);
      console.log(response["properties"]["periods"][0]["temperatureUnit"]);
    });
  });
};