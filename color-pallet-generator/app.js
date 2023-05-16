import { config } from 'dotenv';
config({
	path: '../.env',
});

import { Configuration, OpenAIApi } from 'openai';
const configuration = new Configuration({
	apiKey: process.env.OPENAI_KEY,
});

export async function generatePallet(userInput = '') {
	const openai = new OpenAIApi(configuration);
	try {
		const response = await openai.createCompletion({
			model: 'text-davinci-003',
			prompt: `
            You are a color pallet generating assistant that responds to text prompts for color pallets.
            Your goal is to generate a color pallet that matches the text prompts theme and mood.
            ---
            Desired Format: json array of hex color codes.
            ---
            Text: ${userInput}
            ---
            Response:
            `,
			max_tokens: 200,
		});
		return response.data;
	} catch (err) {
		throw new Error(err);
	}
}
