$(document).ready(() => {
  currentRoom = 'lobby';
  this.app.fetch(currentRoom);
  $('#writeMessage').on('click', (event) => {

    let message = {
      username: window.location.search.slice(10),
      text: $('#messageInput').val(),
      roomname: currentRoom
    };
    this.app.send(message);
  });
  $('#makeRoom').on('click', (event) => {
    this.app.renderRoom($('#roomName').val());
  });
  $('#roomSelect').change((event) => {
    console.log($(event.currentTarget).find('option:selected').val());
    currentRoom = $(event.currentTarget).find('option:selected').val();
    this.app.clearMessages();
    console.log(currentRoom);
    this.app.fetch(currentRoom);
  });
  $('.username').on('click', (event) => {
    let friend = event.currentTarget.innerHTML;
    this.app.friends[friend] = friend;
    // this.app.handleUsernameClick(friend);
    console.log(friend);
    $('.' + friend).addClass('friend');
  });
});