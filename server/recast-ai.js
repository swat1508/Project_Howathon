export default class RecastApi {
  parseData(response, outputCommand) {
    let slug = response["results"]["intents"][0]["slug"];
    let userData = response["results"]["entities"];
    let possiblePiiKeywords = ["credit_card_expiry", "credit_card_number"];
    if (slug == "piiparse") {
      for (let data in userData) {
        if (possiblePiiKeywords.indexOf(data) > -1) {
          let dataValue = response["results"]["entities"][data][0]["value"];
          outputCommand = outputCommand.replace(dataValue, `<${data}>`);
        }
      }
      console.log("outputCommand", outputCommand);
    }
  }
}
