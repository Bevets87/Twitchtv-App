(function (window) {
  'user strict'

  function Controller (model, view) {
    var self = this;
    self.model = model;
    self.view = view;

    self.view.bind('setTwitchProfiles', function () {
      self.view.render('clearEntries');
      self.model.read(function (twitchUsers) {
        twitchUsers.forEach(function (twitchUser, index) {
          var status, logo;
          self.getTwitchUserProfile(twitchUser.name, function (profileData) {
            logo = !profileData.logo ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Placeholder_no_text.svg/1024px-Placeholder_no_text.svg.png' : profileData.logo;
            self.getTwitchUserStream(profileData.name, function (streamData) {
              status = !streamData.stream ? 'off-line' : streamData.stream.game;
              self.model.update(index, {logo: logo, status: status}, function (twitchUser) {
                self.view.render('showEntry', twitchUser);
              })
            })
          })
        })
      })
    })

    self.view.bind('filterTwitchUser', function (e) {
      switch(e.target.value) {
      case 'All':
        self.view.render('clearEntries');
        self.model.read(function (twitchUsers) {
          twitchUsers
          .map(function (twitchUser) {
            self.view.render('showEntry', twitchUser);
          })
        })
        break;
      case 'Online':
        self.view.render('clearEntries')
        self.model.read(function (twitchUsers) {
          twitchUsers
          .filter(function (twitchUser) {
            return twitchUser.status !== 'off-line';
          })
          .map(function (twitchUser) {
            self.view.render('showEntry', twitchUser);
          })
        })
        break;
      case 'Offline':
        self.view.render('clearEntries');
        self.model.read(function (twitchUsers) {
          twitchUsers
          .filter(function (twitchUser) {
            return twitchUser.status === 'off-line';
          })
          .map(function (twitchUser) {
            self.view.render('showEntry', twitchUser);
          })
        })
        break;
      }
    })

  }

  Controller.prototype.getTwitchUserProfile = function (twitchUser, cb) {
    fetch('https://cors-anywhere.herokuapp.com/https://wind-bow.gomix.me/twitch-api/users/' + encodeURI(twitchUser))
    .then(function (response) {
      response.json().then(function (data) {
        cb(data)
      })
    })
    .catch(function (error) {
      console.log(error)
    })
  }

  Controller.prototype.getTwitchUserStream = function (twitchUser, cb) {
    fetch('https://cors-anywhere.herokuapp.com/https://wind-bow.gomix.me/twitch-api/streams/' + encodeURI(twitchUser))
    .then(function (response) {
      response.json().then(function (data) {
        cb(data)
      })
    })
    .catch(function (error) {
      console.log(error)
    })
  }

  window.app = window.app || {};
  window.app.Controller = Controller;
}(window))
