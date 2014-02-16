$(function(){
  var socket = io.connect("121.32.1:3000");
  $("#chat").hide();
  $("#name").focus();
  $("form").submit(function(event){
      event.preventDefault();
  });

  $("#join").click(function(){
    var name = $("#name").val();
    if (name != "") {
      socket.emit("join", name);
      $("#login").detach();
      $("#chat").show();
      $("#msg").focus();
      ready = true;
    }
  });

  $("#name").keypress(function(e){
      if(e.which === 13) {
        var name = $("#name").val();
        if (name !== "") {
          socket.emit("join", name);
          ready = true;
          $("#login").detach();
          $("#chat").show();
          $("#msg").focus();
        }
      }
  });

  socket.on("update", function(msg) {
    if(ready)
        $("#msgs").append("" + msg + "");
  })

  socket.on("update-people", function(people){
    if(ready) {
      $("#people").empty();
      $.each(people, function(clientid, name) {
        $('#people').append("" + name + "");
      });
    }
  });

  socket.on("chat", function(who, msg){
    if(ready) {
      $("#msgs").append("<li><strong><span class='text-success'>" + who + "</span></strong> says: " + msg + "</li>");
    }
  });

  socket.on("disconnect", function(){
    $("#msgs").append("The server is not available");
    $("#msg").attr("disabled", "disabled");
    $("#send").attr("disabled", "disabled");
  });


  $("#send").click(function(){
    var msg = $("#msg").val();
    socket.emit("send", msg);
    $("#msg").val("");
  });

  $("#msg").keypress(function(e){
    if(e.which === 13) {
      var msg = $("#msg").val();
      socket.emit("send", msg);
      $("#msg").val("");
    }
  });
});