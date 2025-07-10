'use server';

/**
 * @fileOverview A flow for generating search suggestions based on an uploaded image.
 *
 * - generateSearchSuggestions - A function that handles the generation of search suggestions.
 * - GenerateSearchSuggestionsInput - The input type for the generateSearchSuggestions function.
 * - GenerateSearchSuggestionsOutput - The return type for the generateSearchSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSearchSuggestionsInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type GenerateSearchSuggestionsInput = z.infer<
  typeof GenerateSearchSuggestionsInputSchema
>;

const GenerateSearchSuggestionsOutputSchema = z.object({
  suggestions: z
    .array(z.string())
    .describe('An array of search suggestions related to the image.'),
});
export type GenerateSearchSuggestionsOutput = z.infer<
  typeof GenerateSearchSuggestionsOutputSchema
>;

export async function generateSearchSuggestions(
  input: GenerateSearchSuggestionsInput
): Promise<GenerateSearchSuggestionsOutput> {
  return generateSearchSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSearchSuggestionsPrompt',
  input: {schema: GenerateSearchSuggestionsInputSchema},
  output: {schema: GenerateSearchSuggestionsOutputSchema},
  prompt: `You are an AI assistant that generates search suggestions based on an image.

  Given the following image, generate five search suggestions that would help a user find
  similar images or information about the contents of the image.

  Image: {{media url=photoDataUri}}
  Suggestions:`, // Changed from triple braces to double braces.
});

const generateSearchSuggestionsFlow = ai.defineFlow(
  {
    name: 'generateSearchSuggestionsFlow',
    inputSchema: GenerateSearchSuggestionsInputSchema,
    outputSchema: GenerateSearchSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
