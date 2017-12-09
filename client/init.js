$(document).ready(() => {
  this.app.fetch();
  $('#writeMessage').on('click', (event) => {

    let message = {
      username: window.location.search.slice(10),
      text: $('#messageInput').val(),
      roomname: 'lobby'
    };

    this.app.send(message);
  });
  $('#makeRoom').on('click', function(event) {
    alert('bye');
  });
});