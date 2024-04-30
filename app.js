document.addEventListener('DOMContentLoaded', function() {
    fetchTargetWord();

    window.handleKeyPress = function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            const description = document.getElementById('input-box').value;
            sendDescription(description);
        }
    };
});

function fetchTargetWord() {
    fetch('http://localhost:3000/api/word', {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('word-display').textContent = data.word;
    })
    .catch(error => console.error('Error fetching target word:', error));
}

function sendDescription(description) {
    fetch('http://localhost:3000/api/guess', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description: description })
    })
    .then(response => response.json())
    .then(data => {
        displayResponse(data);
        if (data.success) {
            fetchTargetWord(); // Fetch a new target word on success
        }
    })
    .catch(error => console.error('Error submitting description:', error));
}

function displayResponse(data) {
    const messageContainer = document.getElementById('message-container');
    messageContainer.innerHTML = ''; // Clear previous messages
    let messageElement = document.createElement('div');

    if (data.success) {
        messageElement.textContent = 'Success!';
        messageElement.className = 'message-correct';
    } else {
        messageElement.textContent = `Did you mean "${data.guess}"?`;
        messageElement.className = 'message-wrong';
    }

    messageContainer.appendChild(messageElement);
}
