import { Configuration, OpenAIApi } from 'openai';
import fs from 'fs';
import { config } from 'dotenv';

config({
	path: '../.env',
});

const configuration = new Configuration({
	apiKey: process.env.OPENAI_KEY,
});

const PROMPT = `
You will receive a file's contents a text.
Generate a code review for the file. Indicate what changes should be made to improve its style, performance, readability, maintainability, and scalability. If there's any reputable libraries that can be introduced to improve code, suggest them. Be kind and constructive. For Each suggestive change, include line numbers to which you are referring to.
`;

const MESSAGES = [
	{
		role: 'system',
		content: PROMPT,
	},
	{
		role: 'user',
		content: `Code review the following file contents:\n ${fs.readFileSync('./contentToReview.js', 'utf-8')}`,
	},
];

async function main() {
	const openai = new OpenAIApi(configuration);

	try {
		const completion = await openai.createChatCompletion({
			model: 'gpt-3.5-turbo',
			messages: MESSAGES,
			max_tokens: 100,
		});

		console.log(completion.data.choices[0].message.content);
	} catch (err) {
		console.log(err.message);
	}
}

main();
