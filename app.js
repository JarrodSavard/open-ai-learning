import 'dotenv/config';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
	apiKey: process.env.OPENAI_KEY,
});

export async function generatePallet() {
	const openai = new OpenAIApi(configuration);
	const response = await openai.createCompletion({
		model: 'text-davinci-003',
		prompt: 'Say this is a test',
		temperature: 0,
		max_tokens: 7,
	});
}
