"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Recast = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _recastAi = require("./recast-ai");

var _recastAi2 = _interopRequireDefault(_recastAi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import * as PersistentOps from "./persistent-ops";
// import * as domManipulator from "./dom-ops";

// const store = PersistentOps.store;
var $config = require("./config");
var fetch = require('node-fetch');

// const dom = new domManipulator.DomManipulator();

var Recast = exports.Recast = function () {
    function Recast() {
        _classCallCheck(this, Recast);

        this.recastToken = $config.recasttoken;
        this.requestUrl = "https://api.cai.tools.sap/v2/request";;
    }

    _createClass(Recast, [{
        key: "getAndCallProcessIntent",
        value: function getAndCallProcessIntent(request, text) {
            var url = this.requestUrl + "?text=" + request.input;
            var bodyRelevant = "";
            var intent = "";

            console.log('url passed in fetch is : ', url);
            return fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    Authorization: "Token " + this.recastToken
                },
                data: text
            }).then(function (response) {
                response.json().then(function (body) {
                    var recastResponseProcesser = new _recastAi2.default();
                    var processedResponse = recastResponseProcesser.parseData(body, request.input);
                    // bodyRelevant = body.results;
                    // intent = bodyRelevant.intents[0] ? bodyRelevant.intents[0].slug : "";
                    // console.log(bodyRelevant)
                    // if (intent !== undefined && intent === "piiparse") {
                    //     const entities = bodyRelevant.entities
                    //     if ()
                    // }
                });
            }).catch(function (error) {
                console.error("Fetch Error =\n", error);
            });
        }
    }]);

    return Recast;
}();