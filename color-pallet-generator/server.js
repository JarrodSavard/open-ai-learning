import { generatePallet } from './app.js';
import express from 'express';

const app = express();
app.use(express.json());
const port = 3000;

// Enable CORS middleware
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

app.get('/', (req, res) => {
	res.json({ status: 'online' });
});

app.post('/pallet', async (req, res) => {
	try {
		const userInput = req.body.userInput;
		const response = await generatePallet(userInput);
		let pallet = response.choices[0].text;
		pallet = JSON.parse(pallet);

		const returnData = {
			status: 'success',
			pallet,
		};
		res.json(returnData);
	} catch (err) {
		res.json({ status: 'error', message: err.message });
	}
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
