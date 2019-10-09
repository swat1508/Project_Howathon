//const uri = "https://api.recast.ai/v2/request?text=";
const uri = "https://api.cai.tools.sap/v2/request?text=";
const token = "Token 26021d055040a9d9f1ad48476efab4a0";
let h = new Headers();
h.append("Content-Type", "application/json");
h.append("Authorization", token);

let possiblePiiKeywords = ["credit_card_expiry", "credit_card_number"];
let parsedData = "";
export default class RecastApi {
  parseData() {
    let queryCommand = document.getElementById("searchbox").value;
    let outputCommand = queryCommand;
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
            //console.log("slug:", slug);
            let userData = response["results"]["entities"];
            console.log("userData:", userData);

            if (slug == "piiparse") {
              for (let data in userData) {
                console.log("data:", data);
                if (possiblePiiKeywords.indexOf(data) > -1) {
                  console.log(data, "is possiblePiiKeywords");
                  let dataValue =
                    response["results"]["entities"][data][0]["value"];
                  console.log("data value:", dataValue);
                  if (data == "credit_card_expiry") {
                    outputCommand = outputCommand.replace(
                      dataValue,
                      "<credit_card_expiry>"
                    );
                    console.log("outputCommand", outputCommand);
                  } else if (data == "credit_card_number") {
                    outputCommand = queryCommand.replace(
                      dataValue,
                      "<credit_card_number>"
                    );

                    console.log("outputCommand", outputCommand);
                  }
                }
              }
            }
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
