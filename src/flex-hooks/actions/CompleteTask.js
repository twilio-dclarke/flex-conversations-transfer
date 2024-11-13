import { Actions, TaskHelper } from "@twilio/flex-ui";

export function handleLeaveConversation() { 

    //Replace the CompleteTask action
    Actions.replaceAction("CompleteTask", async (payload, original) => {
        const { task } = payload;
        //If the taskTransfer attribute is not true run the CompleteTask action 
        if (!task.attributes.taskTransfer) {
            return original(payload);
        }

        //If the taskTransfer attribute is true and this is a CBM task invoke the LeaveConversation action
        if (TaskHelper.isCBMTask(payload.task)) {
            Actions.invokeAction("LeaveConversation", payload);
        }
    });
}