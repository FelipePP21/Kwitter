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
room_name = localStorage.getItem("room_name");

function send()
{
  msg = document.getElementById("msg").value;
  firebase.database().ref(room_name).push({
    name:user_name,
    message:msg,
    like:0
  });

  document.getElementById("msg").value = "";
}

function getData() 
{ 
  firebase.database().ref("/"+room_name).on('value', function(snapshot) { 
    document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) {
      childKey  = childSnapshot.key; 
      childData = childSnapshot.val(); 
      if(childKey != "purpose") 
      {
        firebase_message_id = childKey;
        message_data = childData;

        console.log(firebase_message_id);
        console.log(message_data);
        /*name - messageData['name'];          
        message - messageData['message'];
        like - messageData['like']*/
        name = message_data['name'];
	message = message_data['message'];
        like = message_data['like'];
        /*nameWithTag = "<h4> "+ name +"<img class='user_tick' src= 'tick.png'></h4>";
        likeButton ="<button class='btn btn-warning' id="+firebaseMessageId+" value="+like+"onclick='updateLike(this.id)'>";
        spanWithTag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";
        row = nameWithTag + messageWithTag + likeButton + spanWithTag;*/
	name_with_tag = "<h4> "+ name +"<img class='user_tick' src='tick.png'></h4>";
        message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
        like_button ="<button class='btn btn-warning' id="+firebase_message_id+" value="+ like+" onclick='updateLike(this.id)'>";
        span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Curtidas: "+ like +"</span></button><hr>";
        row = name_with_tag + message_with_tag +like_button + span_with_tag;
        document.getElementById("output").innerHTML += row;

      } 
    });  
  }); 
}

getData();

//function updateLike(messageId)
function updateLike(message_id)
{
  /*console.log("botão like pressionado - " + messageId);
  button_id = messageId;*/
  console.log("clicou no botão curtir - " + message_id);
  button_id = message_id;
  likes = document.getElementById(button_id).value;
  /*updatedLikes - Number(likes) + 1;
  console.log(updatedLikes);*/
  updated_likes = Number(likes) + 1;
  console.log(updated_likes);

  /*firebase.database().ref(roomName).child(messageId).update ({
    like : updatedLikes*/
  firebase.database().ref(room_name).child(message_id).update({
    like : updated_likes
  });
}

function logout(){
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location.replace("index.html");
}
