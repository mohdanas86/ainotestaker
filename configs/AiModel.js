// const {
//   GoogleGenerativeAI,
//   HarmCategory,
//   HarmBlockThreshold,
// } = require("@google/generative-ai");

// const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
// const genAI = new GoogleGenerativeAI(apiKey);

// const model = genAI.getGenerativeModel({
//   model: "gemini-1.5-pro",
// });

// const generationConfig = {
//   temperature: 1,
//   topP: 0.95,
//   topK: 40,
//   // maxOutputTokens is limited to ensure 3000-character response
//   maxOutputTokens: 750, // Approximately 3000 characters
//   responseMimeType: "application/json",
//   responseSchema: {
//     type: "object",
//     properties: {
//       response: {
//         type: "string",
//         description: `The response should return Markdown-formatted HTML content. Use triple backticks for code blocks and specify the language as 'html'. Example: {
//         <strong style={{ marginTop: "20px" }}>Answer :</strong>
// <h3 style={{ marginTop: "16px" }}>Title</h3>
// <p>Content goes here.</p>

//         }`,
//       },
//     },
//   },
// };

// export const chatSession = model.startChat({
//   generationConfig,
//   history: [
//     {
//       role: "user",
//       parts: [{ text: "Provide the profile in Markdown HTML format." }],
//     },
//     {
//       role: "model",
//       parts: [
//         {
//           text: `
//           <strong style={{marginTop = "20px"}}>Answer : </strong>
// <h3 style={{marginTop = "16px"}}>Anas Alam</h3>
// <p>8603815050 | coadanas@gmail.com | linkedin | github</p>
// <p>Education</p>
// <p>SRM University, Chennai, IN</p>
// `,
//         },
//       ],
//     },
//   ],
// });

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
});

const generationConfig = {
  temperature: 0.8, // Lowered for more deterministic responses
  topP: 0.9, // Adjusted for balanced creativity
  topK: 50,
  // maxOutputTokens: 750, // Ensures approximately 3000-character output
  maxOutputTokens: 250, // Approximately 1000-character output for concise notes
  responseMimeType: "application/json",
  responseSchema: {
    type: "object",
    properties: {
      response: {
        type: "string",
        description: `
          The response should return Markdown-formatted HTML content. Use triple backticks for code blocks and specify the language as 'html'. 
          Example response format:
          \`\`\`html
          <strong style="margin-top: 20px;">Answer :</strong>
          <h3 style="margin-top: 16px;">Title</h3>
          <p>Content goes here.</p>
          \`\`\`
        `,
      },
    },
  },
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [{ text: "Provide the profile in Markdown HTML format." }],
    },
    {
      role: "model",
      parts: [
        {
          text: `
<strong style="margin-top: 20px;">Answer :</strong>
<h3 style="margin-top: 16px;">Anas Alam</h3>
<p>8603815050 | coadanas@gmail.com | <a href="https://linkedin.com">LinkedIn</a> | <a href="https://github.com">GitHub</a></p>
<p><strong>Education:</strong></p>
<p>SRM University, Chennai, IN</p>
          `,
        },
      ],
    },
  ],
});

/**
 * Generate a new chat response.
 * @param {string} userQuery - The user's query.
 * @returns {Promise<string>} The AI-generated Markdown-formatted HTML response.
 */
export async function getChatResponse(userQuery) {
  try {
    // Add the user's query to the chat history
    chatSession.addMessage({ role: "user", parts: [{ text: userQuery }] });

    // Request a response from the Gemini model
    const response = await chatSession.getResponse();

    // Validate and sanitize the response
    const { text } = response.parts[0];
    if (!text.startsWith("<")) {
      throw new Error("Invalid response format. Expected HTML content.");
    }

    // Add the model's response to the chat history
    chatSession.addMessage({ role: "model", parts: [{ text }] });

    return text;
  } catch (error) {
    console.error("Error in getChatResponse:", error);
    throw new Error("Failed to generate a response. Please try again.");
  }
}
