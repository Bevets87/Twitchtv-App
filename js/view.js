(function (window) {
  'user strict'

  function View () {
    var self = this;

    self.$selectInput = document.getElementById('select-input');
    self.$entriesContainer = document.querySelectorAll('.entries-container');
  }

  View.prototype.bind = function (event, handler) {
    var self = this;
    if (event === 'getTwitchUsers') {
      window.addEventListener('load', function () {
        handler()
      })
    }
    if (event === 'filterTwitchUser') {
      self.$selectInput.addEventListener('click', function (e) {
        handler(e)
      })
    }
  }

  View.prototype.render = function (cmd, data) {
    var self = this;
    var viewCommands = {
      'showEntry': function () {
        console.dir(data)
        var status;
        if (!data.streamData.stream) {
          status = 'off-line';
        } else {
          status = data.streamData.stream.game;
        }
        if (!data.profileData.logo) {
          data.profileData.logo = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Placeholder_no_text.svg/1024px-Placeholder_no_text.svg.png'
        }
        var div = document.createElement('div');
        div.className = 'entry';
        div.id = data.profileData.name;
        div.innerHTML = '<div><img src='+ data.profileData.logo +'></a></div>';
        div.innerHTML += '<div><a href="https://www.twitch.tv/"'+ data.profileData.name +' target="_blank"><h2 class="name">'+ data.profileData.name +'</h2></a></div>';
        div.innerHTML += '<div><h2 class="status">'+ status +'</h2></div>';

        self.$entriesContainer[0].append(div)
      },
      'clearEntries': function () {
        self.$entriesContainer[0].innerHTML = '';
      }
    }
    viewCommands[cmd]();
  }

  window.app = window.app || {};
  window.app.View = View;
}(window))
