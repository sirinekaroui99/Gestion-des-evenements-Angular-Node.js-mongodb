// Initialize Firebase
 

  const firebaseConfig = {
    apiKey: "AIzaSyBosurp6U9ERGuAXfBdzUXSzPiubKpkiAo",
    authDomain: "calendar-ea327.firebaseapp.com",
    projectId: "calendar-ea327",
    storageBucket: "calendar-ea327.appspot.com",
    messagingSenderId: "533898342916",
    appId: "1:533898342916:web:7d4e6ca72f5c9ad75f3b51",
    measurementId: "G-DHSV5J07NZ"
  };
  
  
  firebase.initializeApp(firebaseConfig);
  
  // Get the current user from Firebase Authentication
  const user = firebase.auth().currentUser;
  
  // Get the user's ID token from Firebase Authentication
  user.getIdToken().then((idToken) => {
    // Use the ID token to authenticate with the Google Calendar API
    const accessToken = new firebase.auth.GoogleAuthProvider().credential(idToken).accessToken;
  
    // Make a request to the Google Calendar API using the access token
    fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then((response) => {
      // Handle the response from the API
      console.log(response);
    }).catch((error) => {
      // Handle any errors that occur
      console.error(error);
    });
  });
   