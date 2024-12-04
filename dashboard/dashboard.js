// This can be used to dynamically set the user's name (you would need to retrieve the user name from your database)
document.addEventListener('DOMContentLoaded', function () {
    // Simulating fetching the user's name from the backend
    const userName = "John Doe"; // Replace with the actual username from the database
    const greetingText = document.querySelector('.greeting-text');
    greetingText.textContent = `Hello, ${userName}`;
});

