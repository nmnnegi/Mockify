import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

// Log API key for debugging (without revealing full key)
const apiKey = import.meta.env.VITE_GOOGLE_AI_API_KEY!;
console.log("API key available:", !!apiKey, apiKey ? `(starts with ${apiKey.substring(0, 4)}...)` : "missing");

// Define a fallback chat session type
let chatSession: any = {
  sendMessage: async () => {
    console.error("Using fallback chat session due to initialization error");
    return {
      response: {
        text: () => JSON.stringify([{
          question: "Initialization Error",
          answer: "The AI service could not be initialized. Please check your API key."
        }])
      }
    };
  }
};

try {
  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  // Test the model initialization
  model.generateContent("Test connection")
    .then(() => console.log("Gemini AI model initialized successfully"))
    .catch(err => console.error("Error connecting to Gemini AI:", err));

  // Set the chat session to a real one if initialization succeeded
  chatSession = model.startChat({
    generationConfig,
    safetySettings,
  });
} catch (error) {
  console.error("Failed to initialize Gemini AI:", error);
  // We'll use the fallback chat session defined above
}

// Export the chat session (either real or fallback)
export { chatSession };
