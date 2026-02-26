import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Only for demo purposes in client-side apps
});

export const generateTeamInsight = async (performanceData, context) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a robotics strategy analyst. Analyze match data and provide a concise, encouraging performance summary (approx 2-3 sentences)."
        },
        {
          role: "user",
          content: `Data: ${JSON.stringify(performanceData)}. Context: ${context}`
        }
      ],
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error("AI Error:", error);
    return "Error generating AI insights. Please check your API key.";
  }
};

export const generateStrategyDoc = async (scoutingData) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "Create a professional robotics team match summary document based on scouting data. Use Markdown formatting."
        },
        {
          role: "user",
          content: `Scouting Data: ${JSON.stringify(scoutingData)}`
        }
      ],
    });
    return response.choices[0].message.content;
  } catch (error) {
    return "Failed to generate document.";
  }
};
