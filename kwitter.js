const firebaseConfig = {
    apiKey: "AIzaSyA8qvEBmoJarEgwmzEKkicGHyc1LoA4YkU",
    authDomain: "kwitterbd-fc28e.firebaseapp.com",
    databaseURL: "https://kwitterbd-fc28e-default-rtdb.firebaseio.com",
    projectId: "kwitterbd-fc28e",
    storageBucket: "kwitterbd-fc28e.appspot.com",
    messagingSenderId: "448663814817",
    appId: "1:448663814817:web:95c414b7413b7fcaca26e0"
  };

firebase.initializeApp(firebaseConfig)

function addUser()
{
    user_name = document.getElementById("user_name").value;

    localStorage.setItem("user_name", user_name);

    window.location="kwitter_room.html"
}