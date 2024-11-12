import { Actions, TaskHelper } from "@twilio/flex-ui";

export function handleLeaveConversation() { 
    Actions.replaceAction("CompleteTask", async (payload, original) => {
        const { task } = payload;
        console.log("### 1", typeof task.attributes.taskTransfer)
        if (!task.attributes.taskTransfer) {
            console.log("### 2", task)
            return original(payload);
        }

        if (TaskHelper.isCBMTask(payload.task)) {
            console.log("### 3", task)
            Actions.invokeAction("LeaveConversation", payload);
        }
    });
}