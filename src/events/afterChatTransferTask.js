import { Actions, TaskHelper } from "@twilio/flex-ui";

export const registerAfterChatTransferTaskEvent = async () => {
    Actions.addListener("afterChatTransferTask", async (payload) => {
        const { task } = payload
        const { attributes } = task;
        attributes.taskTransfer = true;
        await task.setAttributes(attributes);
    })
}