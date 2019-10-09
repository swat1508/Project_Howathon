"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var recastai = require("./recast-ai");
var appController = require('./controller/appController');
// import * as PersistentOps from "./persistent-ops";
// import * as domManipulator from "./dom-ops";

// const store = PersistentOps.store;
var $config = require("./config");
var fetch = require('node-fetch');

// const dom = new domManipulator.DomManipulator();

var Recast = function () {
    function Recast() {
        _classCallCheck(this, Recast);

        this.recastToken = $config.recasttoken;
        this.requestUrl = "https://api.cai.tools.sap/v2/request";;
    }

    _createClass(Recast, [{
        key: "getAndCallProcessIntent",
        value: function getAndCallProcessIntent(request, text) {
            var url = this.requestUrl + "?text=" + request.message;

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
                    var recastResponseProcesser = new recastai.RecastApi();
                    var processedResponse = recastResponseProcesser.parseData(body, request.message);
                    appController.createMessage({ body: {
                            message: processedResponse,
                            userId: request.userId
                        } });
                });
            }).catch(function (error) {
                console.error("Fetch Error =\n", error);
            });
        }
    }]);

    return Recast;
}();

exports.default = Recast;