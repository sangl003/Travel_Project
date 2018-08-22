  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDnsfwc_F6xp0rx4esMlSBUuACbHJG9itc",
    authDomain: "project-1-userinput.firebaseapp.com",
    databaseURL: "https://project-1-userinput.firebaseio.com",
    projectId: "project-1-userinput",
    storageBucket: "project-1-userinput.appspot.com",
    messagingSenderId: "32436368046"
  };
  firebase.initializeApp(config);

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
  // Deleting the list prior to adding new people or characters
  // (this is necessary otherwise you will have repeat buttons)
  $("#new-added-drop-down").empty();
  // Looping through the array of people and characters
  for (var i = 0; i < DROPDOWNITEMS.length; i++) {
      // Then dynamically generating buttons for each search in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var a = $("<button>");
      // Adding a class of search-btn to our button, and some styling
      a.addClass("search-btn btn btn-default");
      // Adding a data-attribute
      a.attr("data-name", DROPDOWNITEMS[i]);
      // Providing the initial button text
      a.text(DROPDOWNITEMS[i]);
      // Adding the button to the buttons-view div
      $("#all-buttons").append(a);
  }
}

// This function will add what was searched to the dropdown menu if it was not already in the list
$("#add-search").on("click", function(event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var search = $("#search-input").val().trim();
  // Alert since this was already in the array
  if (DROPDOWNITEMS < 8) {
    // If the search by the user is already in the array an alert appears
    if (DROPDOWNITEMS.includes(search)){
        alert("Search is already in the dropdown");
    } else {
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
  } else { // When DROPDOWNITEMS reaches 8
    alert("The amount of search has reached the limit, please close out of some of the searches");
  }
  // Calling renderButtons which handles the processing of our search array
  renderButtons();
  // Clearing input after the search is added
  document.getElementById("search-input").value= "";
});

/* Note: This example requires that you consent to location sharing when
prompted by your browser. If you see the error "The Geolocation service
failed.", it means you probably did not give permission for the browser to
locate you.  */
var map, infoWindow;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 6
  });
  infoWindow = new google.maps.InfoWindow;

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      infoWindow.open(map);
      map.setCenter(pos);
    }, function() {
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
}
