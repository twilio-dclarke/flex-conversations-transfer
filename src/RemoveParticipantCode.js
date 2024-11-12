const getMyParticipantSid = (participants) => {
  			const myParticipant = participants.find(participant => participant.mediaProperties?.identity === Twilio.Flex.Manager.getInstance().conversationsClient?.user?.identity
  		);

  		return myParticipant ? myParticipant.participantSid : "";
	};

Twilio.Flex.Actions.replaceAction("CompleteTask", async (payload,original) => {
	const token = Twilio.Flex.Manager.getInstance().user.token;
	
	const
 	{
		task: 
		{ 
			attributes:{ flexInteractionSid, flexInteractionChannelSid, conversationSid },
		}
	} = payload;
	const participants = await payload.task.getParticipants(flexInteractionChannelSid)
	const flexInteractionParticipantSid = getMyParticipantSid(participants)
	const data = {
		Token: token,
		flexInteractionSid: flexInteractionSid,
		flexInteractionChannelSid: flexInteractionChannelSid,
		flexInteractionParticipantSid: flexInteractionParticipantSid,
		conversationSid: conversationSid
	}
	await fetch("https://custom-flex-extensions-serverless-5769-dev.twil.io/features/conversation-transfer/flex/remove-participant",
		{
			method: "POST",
			headers: {
			"Content-Type": "application/json",
			},
			body: JSON.stringify(data)
		}
	)
})