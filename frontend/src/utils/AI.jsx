"use strict";
const Groq = require("groq-sdk");
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "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",
  dangerouslyAllowBrowser: true,
});

async function getGroqChatCompletion(questions) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "you are a friendly consultant, your role is to convert the prospect into a client by advising to book a session",
      },
      {
        role: "user",
        content: `${questions} answer in a paragraph`,
      },
    ],
    model: "llama3-8b-8192",
  });
}
module.exports = {
  // main,
  getGroqChatCompletion,
};
