document.getElementById('myButton').addEventListener('click', function () {
	var inputText = document.getElementById('myInput').value;
	const tempInputText = inputText;
	document.getElementById('myInput').value = ''; // Clear the input value
	if (tempInputText.length == 0) return alert('Please enter a valid input');
	fetch('http://localhost:3000/pallet', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ userInput: tempInputText }),
	})
		.then(function (response) {
			if (response.ok) {
				return response.json(); // Extract JSON data from the response
			} else {
				throw new Error('POST request failed');
			}
		})
		.then(function (data) {
			const pallet = data.pallet;
			const palletContainer = document.getElementById('pallet-container');

			// Remove existing color divs from the pallet container
			while (palletContainer.firstChild) {
				palletContainer.removeChild(palletContainer.firstChild);
			}

			for (const color of pallet) {
				const div = document.createElement('div');
				div.classList.add('color');
				div.style.backgroundColor = color;
				div.style.width = `calc(100%/${pallet.length})`;

				div.addEventListener('click', function () {
					navigator.clipboard.writeText(color);
				});

				const span = document.createElement('span');
				span.innerText = color;
				div.appendChild(span);

				palletContainer.appendChild(div);
			}
		})
		.catch(function (error) {
			console.error('Error:', error);
		});
});
