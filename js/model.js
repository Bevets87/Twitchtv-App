(function (window) {
  'user strict'

  function Model () {
    var self = this;
    self.twitchUsers = [
      'ESL_SC2',
      'OgamingSC2',
      'cretetion',
      'freecodecamp',
      'storbeck',
      'habathcx',
      'RobotCaleb',
      'noobs2ninjas'
    ]
  }

  Model.prototype.read = function (cb) {
    var self = this;
    cb(self.twitchUsers);
  }


  window.app = window.app || {};
  window.app.Model = Model;
}(window))
