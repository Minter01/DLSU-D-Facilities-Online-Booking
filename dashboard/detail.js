// Initialize current date
let currentDate = new Date();
let selectedDate = null; // Track the selected date
let selectedReservation = null; // Track the selected reservation

// Dummy reserved dates (for testing purposes)
const reservedDates = [
    new Date(2024, 10, 5), // November 5th, 2024
    new Date(2024, 10, 12), // November 12th, 2024
    new Date(2024, 10, 20), // November 20th, 2024
    new Date(2024, 10, 25), // November 25th, 2024
];



// Function to handle month navigation
function changeMonth(direction) {
    currentDate.setMonth(currentDate.getMonth() + direction);
    renderCalendar();
}

// Function to render the calendar
function renderCalendar() {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // Update the month and year display
    document.getElementById("monthYear").textContent = `${monthNames[month]} ${year}`;

    // Clear previous calendar grid
    const calendarGrid = document.getElementById("calendar-grid");
    calendarGrid.innerHTML = "";

    // Add day names to the calendar grid
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    dayNames.forEach(day => {
        const dayDiv = document.createElement("div");
        dayDiv.classList.add("day-name");
        dayDiv.textContent = day;
        calendarGrid.appendChild(dayDiv);
    });

    // Add empty divs for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
        const emptyDiv = document.createElement("div");
        calendarGrid.appendChild(emptyDiv);
    }

    // Populate calendar with dates
    for (let day = 1; day <= daysInMonth; day++) {
        const dayDiv = document.createElement("div");
        dayDiv.classList.add("date");
        dayDiv.textContent = day;

        const currentDay = new Date(year, month, day);

        // Check if the date is reserved
        const isReserved = reservedDates.some(reservedDate =>
            reservedDate.getTime() === currentDay.getTime()
        );

        // Highlight selected date
        if (selectedDate && selectedDate.getTime() === currentDay.getTime()) {
            dayDiv.classList.add("selected");
        }

        // Mark reserved dates
        if (isReserved) {
            dayDiv.classList.add("reserved");
        }

        // Handle date click
        dayDiv.addEventListener("click", () => {
            if (!isReserved) {
                selectedDate = currentDay;
                renderCalendar(); // Re-render to update UI
            }
        });

        calendarGrid.appendChild(dayDiv);
    }
}

// Function to handle reservation option selection
function selectReservation(option) {
    const options = document.querySelectorAll(".option");
    options.forEach(opt => opt.classList.remove("selected")); // Deselect previous option

    // Highlight the selected option
    const selectedOption = [...options].find(opt => opt.textContent.includes(option));
    if (selectedOption) {
        selectedOption.classList.add("selected");
    }

    selectedReservation = option;
}

// Function to schedule the event
function scheduleEvent() {
    // Validate selected date and reservation
    if (!selectedDate) {
        alert("Please select a date.");
        return;
    }
    if (!selectedReservation) {
        alert("Please select a time slot.");
        return;
    }

    // Validate event details
    const eventName = document.getElementById("event-name").value.trim();
    const attendees = document.getElementById("attendees").value.trim();
    if (!eventName || !attendees) {
        alert("Please provide event details.");
        return;
    }

    // Store the data in localStorage
    localStorage.setItem("selectedDate", selectedDate.toDateString());
    localStorage.setItem("selectedReservation", selectedReservation);
    localStorage.setItem("eventName", eventName);
    localStorage.setItem("attendees", attendees);

    // Redirect to reservation.html
    window.location.href = "confirmation.html";
}

// Initialize the calendar on page load
renderCalendar();
