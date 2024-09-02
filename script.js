// Set the current date
function getCurrentDateTime() {
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    return `Date: ${date}, Time: ${time}`;
}

// Set the current date and time
document.getElementById('date').innerText = getCurrentDateTime();

//document.getElementById('date').innerText = `Date: ${new Date().toLocaleDateString()}`;

//document.getElementById('time').innerText = `Date: ${new setTimeout.toLocalTimeString()}`;


// Initialize speech recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    document.getElementById('diaryEntry').value = transcript;
};

recognition.onerror = (event) => {
    alert('Error occurred in recognition: ' + event.error);
};

document.getElementById('startRecording').onclick = () => {
    recognition.start();
};

document.getElementById('saveEntry').onclick = () => {
    const entryText = document.getElementById('diaryEntry').value;
    const dateText = document.getElementById('date').innerText;

    if (entryText.trim() !== "") {
        const entry = document.createElement('div');
        entry.className = 'entry';
        entry.innerHTML = `
            <strong>${dateText}</strong>
            <p>${entryText}</p>
            <button class="deleteEntry">Delete</button>
        `;
        document.getElementById('entries').appendChild(entry);
        document.getElementById('diaryEntry').value = '';
    } else {
        alert('Please enter some text or record your voice.');
    }
};

// Add event delegation to handle delete button clicks
document.getElementById('entries').addEventListener('click', (event) => {
    if (event.target && event.target.classList.contains('deleteEntry')) {
        const entry = event.target.parentElement;
        entry.remove();
    }
});
