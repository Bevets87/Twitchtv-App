(function (window) {
  'user strict'

  function View () {
    var self = this;

    self.$selectInput = document.getElementById('select-input');
    self.$entriesContainer = document.querySelectorAll('.entries-container');
  }

  View.prototype.bind = function (event, handler) {
    var self = this;
    if (event === 'setTwitchProfiles') {
      window.addEventListener('load', function () {
        handler()
      })
    }
    if (event === 'filterTwitchUser') {
      self.$selectInput.addEventListener('change', function (e) {
        handler(e)
      })
    }
  }

  View.prototype.render = function (cmd, data) {
    var self = this;
    var viewCommands = {
      'showEntry': function () {
        var div = document.createElement('div');
        div.className = 'entry';
        div.id = data.name;
        div.innerHTML = '<div><img src='+ data.logo +'></a></div>';
        div.innerHTML += '<div><a href="https://www.twitch.tv/"'+ data.name +' target="_blank"><h2 class="name">'+ data.name +'</h2></a></div>';
        div.innerHTML += '<div><h2 class="status">'+ data.status +'</h2></div>';

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
