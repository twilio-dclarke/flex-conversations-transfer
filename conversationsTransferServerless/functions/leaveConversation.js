const TokenValidator = require("twilio-flex-token-validator").functionValidator;

exports.handler = TokenValidator(async function (context, event, callback) {
  const client = context.getTwilioClient();

  const response = new Twilio.Response();
  response.appendHeader("Access-Control-Allow-Origin", "*");
  response.appendHeader("Access-Control-Allow-Methods", "OPTIONS POST GET");
  response.appendHeader("Access-Control-Allow-Headers", "Content-Type");
  response.appendHeader("Content-Type", "application/json");

    const {
        flexInteractionSid,
		flexInteractionChannelSid,
		flexInteractionParticipantSid,
    } = event;

  try {
      // //remove agent from conversation but leave the conversation/interaction active
    await client.flexApi.v1
      .interaction(flexInteractionSid)
      .channels(flexInteractionChannelSid)
      .participants(flexInteractionParticipantSid)
      .update({ status: "closed" });
  } catch (error) {
    console.error("Error in transferConversation function:", error);
    response.setBody({ success: false, error });
    return callback(null, response);
  }
});
