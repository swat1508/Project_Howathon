import RecastApi from './recast-ai'
import appController from './controller/appController'
// import * as PersistentOps from "./persistent-ops";
// import * as domManipulator from "./dom-ops";

// const store = PersistentOps.store;
const $config = require("./config");
const fetch = require('node-fetch')

// const dom = new domManipulator.DomManipulator();

class Recast {
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
            return response.json().then((body) => {
                const recastResponseProcesser = new RecastApi()
                const processedResponse = recastResponseProcesser.parseData(body, request.message)
                appController.createMessage({body: {
                    message: processedResponse.outputCommand,
                    userId: request.id
                }})
                return processedResponse.slug
            });
        })
        .catch((error) => {
            console.error("Fetch Error =\n", error);
        });
    }
}

export default Recast;