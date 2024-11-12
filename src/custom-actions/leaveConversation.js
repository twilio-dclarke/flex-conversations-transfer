import { Actions, Manager } from "@twilio/flex-ui";

export const registerLeaveConversationAction = () => {
  Actions.registerAction("LeaveConversation", (payload) =>
    handleLeaveConversationAction(payload)
  );
};

const _getMyParticipantSid = (participants) => {
    const myParticipant = participants.find(participant => participant?.type === "agent");
    return myParticipant ? myParticipant.participantSid : "";
};

const _getToken = () => {
    return Manager.getInstance().store.getState().flex.session.ssoTokenPayload.token;
}

const handleLeaveConversationAction = async (payload) => {
    
    const token = _getToken();
    const {
		task: { 
			attributes:{ flexInteractionSid, flexInteractionChannelSid, conversationSid, taskTransfer },
		}
    } = payload;
    
    const participants = await payload.task.getParticipants(flexInteractionChannelSid);
    const flexInteractionParticipantSid = _getMyParticipantSid(participants);

    const leaveConversationPayload = {
        Token: token,
		flexInteractionSid: flexInteractionSid,
		flexInteractionChannelSid: flexInteractionChannelSid,
		flexInteractionParticipantSid: flexInteractionParticipantSid,
        conversationSid: conversationSid,
        taskTransfer: taskTransfer
    }
    
    try {
        if (taskTransfer) {
            await _sendLeaveConversationRequest(leaveConversationPayload)
        }
    } catch (e) {
        console.error(e);
    }
}

const _sendLeaveConversationRequest = async (leaveConversationPayload) => {
    const data = JSON.stringify(leaveConversationPayload)
    await fetch(`${process.env.FLEX_APP_TWILIO_SERVERLESS_DOMAIN}/leaveConversation`,
		{
			method: "POST",
			headers: {
			"Content-Type": "application/json",
			},
			body: data
		}
	)
}


