import RecastApi from "./recast-ai";

// import * as PersistentOps from "./persistent-ops";
// import * as domManipulator from "./dom-ops";

// const store = PersistentOps.store;
const $config = require("./config");
const fetch = require('node-fetch')

// const dom = new domManipulator.DomManipulator();

export class Recast {
    constructor() {
        this.recastToken = $config.recasttoken;
        this.requestUrl = "https://api.cai.tools.sap/v2/request";;
    }

    getAndCallProcessIntent(request, text) {
        const url = `${this.requestUrl}?text=${request.message}`;

        console.log('url passed in fetch is : ' , url);
        return fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                Authorization: `Token ${this.recastToken}`,
            },
            data: text,
        })
        .then((response) => {
            response.json().then((body) => {
                const recastResponseProcesser = new RecastApi()
                const processedResponse = recastResponseProcesser.parseData(body, request.message)
                request.message = processedResponse
                fetch('/message', {
                    method: "POST",
                    data: request.message,
                })
            });
        })
        .catch((error) => {
            console.error("Fetch Error =\n", error);
        });
    }
}