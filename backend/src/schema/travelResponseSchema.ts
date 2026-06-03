import z from "zod";

export const schema = z.object({
  title: z
    .string()
    .describe("Concise title, e.g., 'Stay at The Taj Mahal Palace'"),
  destination: z.string().describe("Main destination city or area"),
  startDate: z.string().describe("Earliest event date in YYYY-MM-DD format"),
  endDate: z.string().describe("Latest event date in YYYY-MM-DD format"),
  content: z
    .string()
    .describe(
      "Clean narrative summary of the booking details in Markdown format",
    ),
  extractedData: z.array(
    z.object({
      type: z.enum(["flight", "hotel", "train", "bus", "car-rental", "other"]),
      provider: z.string(),
      bookingReference: z.string(),
      from: z.string(),
      to: z.string(),
      startDate: z.string(),
      startTime: z.string(),
      endDate: z.string(),
      endTime: z.string(),
      additionalNotes: z.string(),
    }),
  ),
});