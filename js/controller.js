(function (window) {
  'user strict'

  function Controller (model, view) {
    var self = this;
    self.model = model;
    self.view = view;

    self.view.bind('getTwitchUsers', function () {
      self.model.read(function (twitchUsers) {
        twitchUsers.map(function (twitchUser) {
          self.getTwitchUserProfile(twitchUser, function (profileData) {
            self.getTwitchUserStream(profileData.name, function (streamData) {
              self.view.render('showEntry',{streamData: streamData, profileData: profileData})
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
          twitchUsers.map(function (twitchUser) {
            self.getTwitchUserProfile(twitchUser, function (profileData) {
              self.getTwitchUserStream(profileData.name, function (streamData) {
                self.view.render('showEntry',{streamData: streamData, profileData: profileData})
              })
            })
          })
        })
        break;
      case 'Online':
        self.view.render('clearEntries');
        self.model.read(function (twitchUsers) {
          twitchUsers.map(function (twitchUser) {
            self.getTwitchUserProfile(twitchUser, function (profileData) {
              self.getTwitchUserStream(profileData.name, function (streamData) {
                if (streamData.stream) {
                  self.view.render('showEntry',{streamData: streamData, profileData: profileData})
                }
              })
            })
          })
        })
        break;
      case 'Offline':
        self.view.render('clearEntries');
        self.model.read(function (twitchUsers) {
          twitchUsers.map(function (twitchUser) {
            self.getTwitchUserProfile(twitchUser, function (profileData) {
              self.getTwitchUserStream(profileData.name, function (streamData) {
                if (!streamData.stream) {
                  self.view.render('showEntry',{streamData: streamData, profileData: profileData})
                }
              })
            })
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
