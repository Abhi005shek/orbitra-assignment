import { createOpenAI } from "@ai-sdk/openai";
import { generateText, Output } from "ai";
import { schema } from "../schema/travelResponseSchema";

const groq = createOpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY!,
});

export async function extractTravelData(extractedText: string) {
  try {
    const { output  } = await generateText({
      model: groq("openai/gpt-oss-20b"),

      output: Output.object({ schema }),

      system:
        "You are an expert travel document parsing engine. Your job is to extract comprehensive itinerary, ticket, and booking information from raw unstructured text. " +
        "Analyze dates carefully relative to today's date (June 2, 2026). " +
        "If a piece of information is missing from the document, set its field value to null.",

      prompt: `Analyze and extract the travel records from the following text:\n\n${extractedText}`,
    });

    return output;
  } catch (err) {
    console.log("Error extracting travel data:", err);
    throw new Error(`Failed to extract travel data`);
  }
}
