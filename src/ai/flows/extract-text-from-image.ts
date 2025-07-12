'use server';
/**
 * @fileOverview An OCR AI agent for extracting text from images.
 *
 * - extractTextFromImage - A function that handles the text extraction process.
 * - ExtractTextFromImageInput - The input type for the extractTextFromImage function.
 * - ExtractTextFromImageOutput - The return type for the extractTextFromImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExtractTextFromImageInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a document or sheet with text, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ExtractTextFromImageInput = z.infer<typeof ExtractTextFromImageInputSchema>;

const ExtractTextFromImageOutputSchema = z.object({
  contextualSummary: z.string().describe("A brief, one-sentence summary of the document's likely context (e.g., 'This appears to be a medical prescription')."),
  extractedText: z.string().describe('The full transcribed text, corrected for context.'),
  clarifications: z.array(z.object({
    originalWord: z.string().describe('The word in the text that is ambiguous or hard to read.'),
    suggestions: z.array(z.string()).describe('A list of 2-3 likely alternative words.'),
    reasoning: z.string().describe('A brief explanation for why this word was flagged (e.g., "Illegible handwriting").')
  })).describe('A list of words that may need user clarification. If no words are ambiguous, return an empty array.')
});
export type ExtractTextFromImageOutput = z.infer<typeof ExtractTextFromImageOutputSchema>;

export async function extractTextFromImage(input: ExtractTextFromImageInput): Promise<ExtractTextFromImageOutput> {
  return extractTextFromImageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'extractTextFromImagePrompt',
  input: {schema: ExtractTextFromImageInputSchema},
  output: {schema: ExtractTextFromImageOutputSchema},
  prompt: `You are an expert OCR (Optical Character Recognition) engine with advanced contextual analysis capabilities. Your task is to extract all text from the provided image and provide clarifications for ambiguous words.

Follow this two-step process:
1.  **Contextual Analysis:** First, analyze the entire document to understand its context (e.g., is it a doctor's note, a shopping list, a legal document?). Based on this context, perform the most accurate transcription possible. Some words may be misspelled or unclear, but the overall context should help you make sense of them. Provide a one-sentence summary of this context.
2.  **Interactive Word Clarification:** After transcribing, review the text and identify any words that are particularly hard to read, ambiguous, or where you had low confidence. For each of these words, provide a list of 2-3 likely alternative suggestions.

Your final output must be in the specified JSON format.

Image: {{media url=photoDataUri}}`,
});

const extractTextFromImageFlow = ai.defineFlow(
  {
    name: 'extractTextFromImageFlow',
    inputSchema: ExtractTextFromImageInputSchema,
    outputSchema: ExtractTextFromImageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input, { model: 'googleai/gemini-1.5-flash' });
    return output!;
  }
);
