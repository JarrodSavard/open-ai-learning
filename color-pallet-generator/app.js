import { config } from 'dotenv';
config({
	path: '../.env',
});

import { Configuration, OpenAIApi } from 'openai';
const configuration = new Configuration({
	apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);
const response = await openai.createCompletion({
	model: 'text-davinci-003',
	prompt: `
    You are a color pallet generating assistant that responds to text prompts for color pallets.
    Your goal is to generate a color pallet that matches the text prompts theme and mood.
    ---
    Desired Format: json array of hex color codes.
    ---
    Text: a beautiful sunset
    ---
    Response:
    `,
	max_tokens: 200,
});

console.log(response.data);
