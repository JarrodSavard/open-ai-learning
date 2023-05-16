import express from 'express';
const app = express();
const port = 3000;

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.get('/api', (req, res) => {
	res.send('API');
});

app.post('/', (req, res) => {
	res.send('Got a POST request');
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
