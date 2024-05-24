"use strict";
const Groq = require("groq-sdk");
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
  // "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"
  dangerouslyAllowBrowser: true,
});
// async function main(questions) {
//   const chatCompletion = await getGroqChatCompletion(questions);
//   // Print the completion returned by the LLM.
//   console.log(chatCompletion.choices[0]?.message?.content || "");
// }
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
