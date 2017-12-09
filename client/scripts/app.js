// YOUR CODE HERE:
var app = {
  server: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
  roomnames: {},
  init: () => {},
  send: (message) => {
    $.ajax({
    // This is the url you should use to communicate with the parse API server.
      url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: (data) => {
        console.log('chatterbox: Message sent');
      },
      error: (data) => {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },
  fetch: () => {
    $.ajax({
    // This is the url you should use to communicate with the parse API server.
      url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
      type: 'GET',
      data: { order: '-createdAt'},
      success: (data) => {
        console.log('chatterbox: Message retrieved');
        /*
          createdAt:"2017-12-08T20:55:12.526Z"
          objectId:"hEG6XDGsEE"
          text:"cat was here"
          updatedAt:"2017-12-08T20:55:12.526Z"
          username:"cat"
        */
        console.log(data);
        _.each(data.results, (obj) => {
          this.app.renderMessage(obj);
          if (obj.roomname && !this.app.roomnames[obj.roomname]) {
            this.app.roomnames[obj.roomname] = true;
          }
        });
        // setInterval(() => {
        //   this.app.clearMessages();
        //   this.app.fetch();
        // }, 10000);
      },
      error: function(data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to retrieve message', data);
      }
    });
  },
  clearMessages: () => {
    $('#chats').empty();
  },
  renderMessage: (message) => {
    let {username, text, roomname} = message;
    let $chatDiv = $('<div class="chat"></div>');
    let $usernameAnchor = $(`<a class='username'>${username}</a>`);
    let $textBody = $(`<div class='text'>${text}</div>`);
    $chatDiv.append($usernameAnchor);
    $chatDiv.append($textBody);
    $('#chats').append($chatDiv);
  },
  renderRoom: (room) => {
    $('#roomSelect').append(`<option value="${room}">${room}</option>`);
  },
  handleUsernameClick: () => {

  },
  handleSubmit: () => {

  }
};