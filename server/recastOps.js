import * as PersistentOps from "./persistent-ops";
import * as domManipulator from "./dom-ops";

const store = PersistentOps.store;
const $config = require("./config");

const dom = new domManipulator.DomManipulator();

export class Recast {
    constructor() {
        this.recastToken = $config.recasttoken;
        this.requestUrl = "https://api.recast.ai/v2/request";
    }

    getAndCallProcessIntent(command, text) {
        self = this;
        const url = `${this.requestUrl}?text=${command}`;
        let bodyRelevant = "";
        let intent = "";
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                Authorization: `Token ${this.recastToken}`,
            },
            data: text,
        })
            .then((response) => {
                response.json().then((body) => {
                    bodyRelevant = body.results;
                    intent = bodyRelevant.intents[0] ? bodyRelevant.intents[0].slug : "";
                    if (intent !== undefined && intent !== "") {
                        if (!Object.keys($config.intentSlugToOperations).includes(intent)) {
                            dom.showEmptyCommandMessage("Intent is either not Identified or is not supported, please try again with a different text.");
                            return;
                        }
                        $(`#${$config.constants.hiddenIntentFieldId}`).val(intent);
                        dom.displayIntentBox(intent);
                        if (intent == "resethistory") {
                            store.dispatch($config.intentSlugToOperations.resethistory.action);
                            return;
                        }
                        dom.showWidget(intent);
                        dom.populateRecastData(intent, bodyRelevant);
                        store.dispatch($config.intentSlugToOperations.addquery.action);
                    }
                    return intent;
                });
            })
            .catch((error) => {
                console.error("Fetch Error =\n", error);
            });
    }
}