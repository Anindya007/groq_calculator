import Groq from "groq-sdk";
import dotenv from "dotenv";
import readline from "readline";

dotenv.config(); // load variables

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export async function main() {
  rl.question("Enter your query: ", async (userInput) => {
    const chatCompletion = await getGroqChatCompletion(userInput);
    // Print the completion returned by the LLM.
    console.log(chatCompletion.choices[0]?.message?.content || "");
    rl.close();
  });
}

export async function getGroqChatCompletion(userInput) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: userInput, // Use user input here
      },
    ],
    model: "llama-3.3-70b-versatile",
  });
}

main();
