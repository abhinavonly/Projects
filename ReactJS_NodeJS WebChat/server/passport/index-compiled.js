'use strict';

var passport = require('passport');

module.exports = function (config) {

  // loading strategies
  var localSignupStrategy = require('./local-signup')(config);
  var localLoginStrategy = require('./local-login')(config);

  passport.use('local-signup', localSignupStrategy);
  passport.use('local-login', localLoginStrategy);
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }
}();

;

//# sourceMappingURL=index-compiled.js.map