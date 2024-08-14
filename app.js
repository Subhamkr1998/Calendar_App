const daysContainer = document.getElementById('days');
const monthSelect = document.getElementById('monthSelect');
const yearSelect = document.getElementById('yearSelect');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

// Populate months dropdown
for (let i = 0; i < 12; i++) {
    const option = document.createElement('option');
    option.text = new Date(0, i).toLocaleString('default', { month: 'long' });
    option.value = i;
    monthSelect.add(option);
}
monthSelect.selectedIndex = currentMonth;

// Populate years dropdown
const currentYearIndex = 2; // Adjust this value to change the range of years displayed
for (let i = currentYear - currentYearIndex; i <= currentYear + currentYearIndex; i++) {
    const option = document.createElement('option');
    option.text = i;
    option.value = i;
    yearSelect.add(option);
}
yearSelect.value = currentYear;

// Populate calendar
function populateCalendar(month, year) {
    daysContainer.innerHTML = '';

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    for (let i = 0; i < firstDayOfMonth; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.classList.add('day', 'empty');
        daysContainer.appendChild(emptyDay);
    }

    for (let i = 1; i <= daysInMonth; i++) {
        const dayElement = document.createElement('div');
        dayElement.textContent = i;
        dayElement.classList.add('day');
        if (i === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()) {
            dayElement.classList.add('current-day');
        }
        daysContainer.appendChild(dayElement);
    }
}

// Update calendar when month or year changes
function updateCalendar() {
    const selectedMonth = parseInt(monthSelect.value);
    const selectedYear = parseInt(yearSelect.value);
    populateCalendar(selectedMonth, selectedYear);
}

// Event listeners for month and year selection
monthSelect.addEventListener('change', updateCalendar);
yearSelect.addEventListener('change', updateCalendar);

// Event listeners for navigation buttons
prevBtn.addEventListener('click', () => {
    const selectedMonth = parseInt(monthSelect.value);
    const selectedYear = parseInt(yearSelect.value);

    if (selectedMonth === 0) {
        monthSelect.value = 11;
        yearSelect.value = selectedYear - 1;
    } else {
        monthSelect.value = selectedMonth - 1;
    }

    updateCalendar();
});

nextBtn.addEventListener('click', () => {
    const selectedMonth = parseInt(monthSelect.value);
    const selectedYear = parseInt(yearSelect.value);

    if (selectedMonth === 11) {
        monthSelect.value = 0;
        yearSelect.value = selectedYear + 1;
    } else {
        monthSelect.value = selectedMonth + 1;
    }

    updateCalendar();
});

// Initialize calendar
populateCalendar(currentMonth, currentYear);
