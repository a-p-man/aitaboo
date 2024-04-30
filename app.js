document.addEventListener('DOMContentLoaded', function() {
    fetchTargetWord();
    document.getElementById('input-box').value = ''; // Clear the input box

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
            displaySuccess(data.score);
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


function displaySuccess(score) {
    const messageContainer = document.getElementById('message-container');
    const errorContainer = document.getElementById('error-container');

    messageContainer.textContent = 'Success!';
    messageContainer.className = 'message-correct';
    errorContainer.textContent = ''; // Clear any existing error messages
    document.getElementById('input-box').value = ''; // Clear the input box

    updateScoreDisplay(score);
    fetchTargetWord(); // Fetch a new target word after a successful guess
}

function displayError(errorMessage) {
    const messageContainer = document.getElementById('message-container');
    const errorContainer = document.getElementById('error-container');

    errorContainer.textContent = errorMessage;
    errorContainer.className = 'message-wrong';
    messageContainer.textContent = ''; // Clear any existing success messages
}

function skipWord() {

    const messageContainer = document.getElementById('message-container');
    const errorContainer = document.getElementById('error-container');
    
    messageContainer.textContent = ''; 
    errorContainer.textContent = ''; 

    fetchTargetWord(); // Fetch a new target word
    document.getElementById('input-box').value = ''; // Clear the input box
}

function updateScoreDisplay(score) {
    const scoreDisplay = document.getElementById('score-display');
    scoreDisplay.textContent = 'Score: ' + score;
}