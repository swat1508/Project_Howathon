"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RecastApi = function () {
  function RecastApi() {
    _classCallCheck(this, RecastApi);
  }

  _createClass(RecastApi, [{
    key: "parseData",
    value: function parseData(response, outputCommand) {
      var slug = response["results"]["intents"][0]["slug"];
      var userData = response["results"]["entities"];
      var possiblePiiKeywords = ["credit_card_expiry", "credit_card_number"];
      if (slug == "piiparse") {
        for (var data in userData) {
          if (possiblePiiKeywords.indexOf(data) > -1) {
            var dataValue = response["results"]["entities"][data][0]["value"];
            outputCommand = outputCommand.replace(dataValue, "<" + data + ">");
          }
        }
        console.log("outputCommand", outputCommand);
      }
    }
  }]);

  return RecastApi;
}();

exports.default = RecastApi;