(function (window) {
  'user strict'

  function Model () {
    var self = this;
    self.twitchUsers = [
      {
        name: 'ESL_SC2',
        logo: null,
        status: null
      },
      {
        name: 'OgamingSC2',
        logo: null,
        status: null
      },
      {
        name: 'cretetion',
        logo: null,
        status: null
      },
      {
        name: 'freecodecamp',
        logo: null,
        status: null
      },
      {
        name: 'storbeck',
        logo: null,
        status: null
      },
      {
        name: 'habathcx',
        logo: null,
        status: null
      },
      {
        name: 'RobotCaleb',
        logo: null,
        status: null
      },
      {
        name: 'noobs2ninjas',
        logo: null,
        status: null
      }
    ]
  }

  Model.prototype.read = function (cb) {
    var self = this;
    cb(self.twitchUsers);
  }

  Model.prototype.update = function (index, data, cb) {
    var self = this;
    var twitchUsers = self.twitchUsers.slice();
    var twitchUser = twitchUsers[index];
    twitchUser.logo = data.logo;
    twitchUser.status = data.status;
    self.twitchUsers[index] = twitchUser
    cb(self.twitchUsers[index]);
  }


  window.app = window.app || {};
  window.app.Model = Model;
}(window))
