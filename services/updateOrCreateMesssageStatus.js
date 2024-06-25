import MessagesStatusModel from "../models/messengerStatus.js";

export const updateOrCreateMesssageStatus = async function ({
  botId,
  traineeId,
  status,
}) {
  const room = `${traineeId}-${botId}`;

  try {
    const messageStatus = await MessagesStatusModel.findOneAndUpdate(
      { room },
      { $set: { room, status: status || "play" } },
      { new: status ? false : true, upsert: true, setDefaultsOnInsert: true }
    );

    return messageStatus;
  } catch (error) {
    throw new Error(
      "Error finding or updating/creating message status: " + error.message
    );
  }
};
