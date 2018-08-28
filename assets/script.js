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
//
// [x] Predefined list of 4-6 things (i.e. restaurants, landmarks, parks etc)
// [x] The list expands on user input for the last 3 searches, using firebase to store values
// [x] Drop down to create dynamic favorite list
// [x] Results div to display list of responses
// -------------- Map View --------------
//
// [x] Google maps to be displayed in a Mapview div spanning 70% of screen
// [x] Zoom in and Zoom out functionality
// [x] Location button to determine users location
// [ ] Info buttons on points of interest? - Google Places API ref
// ---------- Table Creation ----------
//
// [x] Creating a table below the displayed map
// [ ] Reviews and distance are displayed on the table
// Optional Additions (If we have time)
//
// ----------- Weather Display ---------
// [x] Weather display in the top? 
//      keep this simple as it's not core of our app
// -------------------------------- GLOBAL VARIABLES (CAPS PLEASE) --------------------------------
var DROPDOWNITEMS = [];

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
    splitStr[i] = splitStr[i].charAt(0).toLowerCase() + splitStr[i].substring(1);
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
  for (let i = 0; i < DROPDOWNITEMS.length; i++) {
    // Then dynamically generating buttons for each search in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    let a = $("<a>");
    // Adding a class of search-btn to our button, and some styling
    a.addClass("dropdown-item");
    // Adding a data-attribute
    a.attr("data-name", DROPDOWNITEMS[i]);
    // Providing the initial button text
    a.text(DROPDOWNITEMS[i]);
    // Adding the button to the buttons-view div
   // let row = a.append('&nbsp <button class="delete-item btn-danger btn-sm"></button>');
    $("#newly-added-drop-down-btns").append(a);
  }
}

// This function will add what was searched to the dropdown menu if it was not already in the list
$("#add-fav").on("click", function (event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var search = $("#search-input").val().trim();
  // Alert since this was already in the array
  if (DROPDOWNITEMS.length < 5) {
    // If the search by the user is already in the array an alert appears
    if (search === "") {
      // Do not do anything if the user inputs an empty string
    }
    else if (DROPDOWNITEMS.includes(search)) {
      //alert("Search is already in the dropdown");
      duplicateModal();
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
        duplicateModal();
      } else {
        // Converts the string so that only the first letter in the string is capitalized
        let convertedStr = upperCaseFirstLetterInString(search);
        DROPDOWNITEMS.push(convertedStr);
      }
    }
  } else { // If the DROPDOWNITEMS.length reaches 4 we will only give the user 3 searches unless they remove some before adding more searches
    limitModal();
  }
  // Calling renderButtons which handles the processing of our search array
  renderDropDownMenu();
  // Clearing input after the search is added
  document.getElementById("search-input").value = "";
});

$(document).on('click','.delete-item', function(){
  // Removes item from html
  $(this).closest('a').remove();
  // Removes item from array
  for (let i = DROPDOWNITEMS.length; i >= 0; i--) {
    if (DROPDOWNITEMS[i] === this.closest('a').getAttribute("data-name")) {
      DROPDOWNITEMS.splice(i, 1);
    }
  }
})

// Basic modal when duplicate search happens
function duplicateModal() {
  // Get the modal
  let modal = document.getElementById('modal-1');
  // Get the <span> element that closes the modal
  let span = document.getElementsByClassName("close")[0];
  // Opens the modal 
  modal.style.display = "block";
  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
      }
  }
}

// Basic modal when search limit is reached
function limitModal() {
  // Get the modal
  let modal = document.getElementById('modal-2');
  // Get the <span> element that closes the modal
  let span = document.getElementsByClassName("close")[0];
  // Opens the modal 
  modal.style.display = "block";
  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
      }
  }
}

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
  var minneapolis = { lat: 44.970, lng: -93.244 };

  map = new google.maps.Map(document.getElementById('map'), {
    center: minneapolis,
    mapTypeId: 'satellite',
    zoom: 14
  });

  infoWindow = new google.maps.InfoWindow;
   // Create the places service.
  var service = new google.maps.places.PlacesService(map);
  var getNextPage = null;

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
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

     //test for the weather api
     getWeather(pos);

     $(document).on('click','.dropdown-item', function(){
      // Removes item from html
      $("#table-results-Body").empty();
      var srch = $(this).closest('a').text();
      console.log(srch);  
      var results;
      // Perform a nearby search.
      service.nearbySearch(
        {
          location: minneapolis, radius: 500, type: [srch]
        },
        function (results, status, pagination) {
          if (status !== 'OK') return;

          createMarkers(results);
          console.log(results);

          for (var i = 0; i <= 5; i++){
            console.log(results[i].name);
           
            $("#table-results-Body").append(`<tr>
                    
              <th> ${results[i].name} <br></th>                     
                    <td>Type: 
                    ${results[i].types} <br>                   
                    </td></tr>`);
          }

         })         
        });    
    }, function () {
      handleLocationError(true, infoWindow, map.getCenter());

    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
  
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

    bounds.extend(place.geometry.location);
  }
  map.fitBounds(bounds);
}

$("#reset-fav").on("click", function (event) {
  event.preventDefault();
  $("#newly-added-drop-down-btns").empty(); 
  $("#table-results-Body").empty();
// $(`#weather`).empty();
// initMap();
});

var getWeather = function(userPosition) {
  var userState;
  var userCity;
  var userTemp;
  var userTempUnit;
  
  var queryURL = `https://api.weather.gov/points/${userPosition.lat},${userPosition.lng}`;
  
  var weatherDiv = $(`<p>`)

  console.log(userPosition);
  console.log(queryURL);

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    userCity = response["properties"]["relativeLocation"]["properties"]["city"];
    userState = response["properties"]["relativeLocation"]["properties"]["state"];

    var queryURL_1 = response["properties"]["forecast"];
    $.ajax({
      url: queryURL_1,
      method: "GET"
    }).then(function(response) {
      userTemp = response["properties"]["periods"][0]["temperature"];
      userTempUnit = response["properties"]["periods"][0]["temperatureUnit"];
      weatherDiv.text(`${userCity}, ${userState}: ${userTemp}° ${userTempUnit}`);
      $(`#weather`).append(weatherDiv);
    });
  });
};