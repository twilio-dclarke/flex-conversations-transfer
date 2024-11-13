import { Actions, TaskHelper } from "@twilio/flex-ui";

export const registerAfterChatTransferTaskEvent = async () => {
    //Set taskTransfer attribute after the ChatTransferTask action has completed
    Actions.addListener("afterChatTransferTask", async (payload) => {
        const { task } = payload
        const { attributes } = task;
        attributes.taskTransfer = true;
        await task.setAttributes(attributes);
    })
}