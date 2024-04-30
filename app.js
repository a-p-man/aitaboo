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
    .then(response => {
        if (!response.ok) {
            throw response; // Throw an error if the response is not 2xx
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            displaySuccess(data.guess);
        } else {
            displayError(`Did you mean "${data.guess}"?`);
        }
    })
    .catch(error => {
        error.json().then(err => {
            displayError(err.error); // Display the error message from the backend
        }).catch(genericError => {
            displayError("An unknown error occurred."); // Fallback error message
        });
    });
}


function displaySuccess(message) {
    const messageContainer = document.getElementById('message-container');
    messageContainer.textContent = 'Success!';
    messageContainer.className = 'message-correct';

    fetchTargetWord(); // Fetch a new target word after a successful guess
}

function displayError(errorMessage) {
    const errorContainer = document.getElementById('error-container');
    errorContainer.textContent = errorMessage;
}

function skipWord() {
    fetchTargetWord(); // Fetch a new target word
    document.getElementById('input-box').value = ''; // Clear the input box
}