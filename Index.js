import { before } from "@vendetta/patcher";
import { findByProps } from "@vendetta/metro";

const sendMessageMod = findByProps("sendMessage");

const templates = [
  (msg) => `You *dare* suggest this is acceptable? ${msg} This is a disgrace to all order and respect!`,
  (msg) => `As if my suffering wasn't enough—now this: ${msg} It's truly intolerable.`,
  (msg) => `Listen closely. ${msg} Do you understand the weight of what that means? The burden *I* must bear?`,
  (msg) => `Am I the only one with standards? ${msg} Pathetic. Shameful. Unforgivable!`
];

function makeRegulusRant(text) {
  const pick = templates[Math.floor(Math.random() * templates.length)];
  return pick(text);
}

let unpatch;

export default {
  onLoad() {
    unpatch = before("sendMessage", sendMessageMod, (args) => {
      const [channelId, message] = args;
      if (!message.content.startsWith("/regulus ")) return;

      const raw = message.content.replace("/regulus ", "").trim();
      message.content = makeRegulusRant(raw);
    });
  },

  onUnload() {
    unpatch?.();
  }
};
