// YOUR CODE HERE:
var app = {
  server: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
  roomnames: {},
  friends: {},
  init: () => {
  },
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
  fetch: (currentRoom) => {
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
        let cleanArr = [];
        let filteredArr = [];
        // data.results.forEach(cleanArr.push(xssEscape(data.results)));
        data.results.forEach((obj) => {
          cleanArr.push(xssEscape(obj));
        });
        _.each(cleanArr, (obj) => {
          if (obj.hasOwnProperty('roomname') && obj.roomname === currentRoom) {
            filteredArr.push(obj);
          }
        });
        _.each(filteredArr, (obj) => {
          this.app.renderMessage(obj);
          if (obj.roomname && !this.app.roomnames[obj.roomname]) {
            this.app.roomnames[obj.roomname] = true;
          }
        });
        console.log(filteredArr);
        console.log(cleanArr);
        $('.username').on('click', (event) => {
          debugger;
          let friend = event.currentTarget.innerHTML;
          friend = friend.replace(/\s+/g, '');
          this.app.friends[friend] = friend;
          // this.app.handleUsernameClick(friend);
          console.log(friend);
          $('.' + friend).addClass('friend');
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
    //if(friendList.contains(username)) {
      //let $chatDiv = $('<div class="chat friend"></div>');
    //} else {
    let $chatDiv = $('<div class="chat"></div>');
    let usernameClass = username.replace(/\s+/g, '');
    let $usernameAnchor = $(`<a href='#' class='username ${usernameClass}'>${username}</a>`);
    let $textBody = $(`<div class='text'>${text}</div>`);
    $chatDiv.append($usernameAnchor);
    $chatDiv.append($textBody);
    $('#chats').append($chatDiv);
  },
  renderRoom: (room) => {
    $('#roomSelect').append(`<option value="${room}">${room}</option>`);
  },
  handleUsernameClick: (friend) => {
    // $('.username').on('click', (event) => {
    //   let friend = event.currentTarget.innerHTML;
    //   this.app.friends[friend] = friend;
    //   // this.app.handleUsernameClick(friend);
    //   console.log(friend);
    //   $('.' + friend).addClass('friend');
    // });
    // Get username from data attribute
    var username = $(event.target).data('username');

    if (username !== undefined) {
      // Toggle friend
      app.friends[username] = !app.friends[username];

      // Escape the username in case it contains a quote
      var selector = '[data-username="' + username.replace(/"/g, '\\\"') + '"]';
      selector = selector.replace(/\s+/g, '');
      // Add 'friend' CSS class to all of that user's messages
      var $usernames = $(selector).toggleClass('friend');
    }
  },
  handleSubmit: () => {

  }
};