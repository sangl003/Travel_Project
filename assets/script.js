  // Initialize Firebase (Joe's firebase, just an fyi)
var config = {
    apiKey: "AIzaSyDnsfwc_F6xp0rx4esMlSBUuACbHJG9itc",
    authDomain: "project-1-userinput.firebaseapp.com",
    databaseURL: "https://project-1-userinput.firebaseio.com",
    projectId: "project-1-userinput",
    storageBucket: "",
    messagingSenderId: "32436368046"
};
firebase.initializeApp(config);

// Start to declare variables 
// Array for list of attractions, 

// ----------- Dropdown menu-----------
// [] Predefined list of 4-6 things (i.e. restaurants, landmarks, parks etc)
// [] The list expands on user input for the last 3 searches, using firebase to store values
// [] Drop down to create dynamic favorite list
// [] Results div to display list of responses

// ----------- Weather Display ---------
// [] Weather display in the top-right corner? 
//      keep this simple as it's not core of our app
//      Okay we can try and include this if there's time

// ------------- MapView -------------
// [] Google maps to be displayed in a Mapview div spanning 70% of screen
// [] Zoom in and Zoom out buttons
// [] Location button to determine users location
// [] Info buttons on points of interest? - Google Places API ref

// ---------- Table creation ----------
// [] Creating a table below the displayed map
// [] Reviews and distance are displayed on the table