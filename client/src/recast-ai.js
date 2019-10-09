//const uri = "https://api.recast.ai/v2/request?text=";
const uri = "https://api.cai.tools.sap/v2/request?text=";
const token = "Token 26021d055040a9d9f1ad48476efab4a0";
let h = new Headers();
h.append("Content-Type", "application/json");
h.append("Authorization", token);

let localvalue = "";

export default class RecastApi {
  parseData() {
    const queryCommand = document.getElementById("searchbox").value;
    return fetch(uri + queryCommand, {
      method: "post",
      headers: h
    })
      .then(response => {
        response
          .json()
          .then(response => {
            console.log("response", response);
            let slug = response["results"]["intents"][0]["slug"];
            console.log("slug:", slug);
            let userData = response["results"]["entities"];
            console.log("userData:", userData);
            // let possiblePiiData = userData.slice(1, userData.length);
            // if (slug == "piiparse") {
            //   const parsedData = console.log(
            //     "possiblePiiData:",
            //     possiblePiiData
            //   );
            // let storeState = store.getState();
            // let objectItems = storeState.items;
            // if (objectItems.length > 0) {
            //   let previousObjectId =
            //     storeState.items[objectItems.length - 1].id;
            //   createRepoObj.id = Number(previousObjectId) + 1;
            // } else {
            //   createRepoObj.id = 1;
            // }

            // store.dispatch({
            //   type: "CREATE_REPO",
            //   item: createRepoObj
            // });
            //}
          })
          .catch(function(err) {
            console.log(
              "There is some error in resolving the intent from sentence..."
            );
          });
      })
      .catch(function() {
        console.log("There is some error in recast.ai api call...");
      });
  }
}
