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

user_name = localStorage.getItem("user_name");

document.getElementById("user_name").innerHTML = "bem vindo(a)" + user_name + "!";

function addRoom()
{
    room_name = document.getElementById("room_name").value;

    firebase.database().ref("/").child(room_name).update({
        purpose : "adding room name"
    });

    localStorage.setItem("room_name", room_name);

    window.location = "kwitter_page.html";
}

function getData()
{
    firebase.database().ref("/").on('value', function(snapshot)
    {
        document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot)
        {
            childKey = childSnapshot.key;
            Room_names = childKey;

            console.log("Nome da sala: " + Room_names);
            row = "<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)' >#"+ Room_names +"</div><hr>";
            document.getElementById("output").innerHTML += row;
        });
    });
}
getData();

function redirectToRoomName(name)
{
    console.log(name);
    localStorage.setItem("room_name", name);
    window.location = "kwitter_page.html";
} 

function logout()
{
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location = "index.html";
}