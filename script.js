const currentDateElement = document.getElementById('current-date');
const countdownElement = document.getElementById('countdown');
const prevDayButton = document.getElementById('prev-day');
const nextDayButton = document.getElementById('next-day');
const jumpToTodayButton = document.getElementById('jump-to-today');
const relativeDayPastElement = document.getElementById('relative-day-past');
const relativeDayFutureElement = document.getElementById('relative-day-future');

const goalDate = new Date('2025-08-31T00:00:00');
let currentDate = new Date();
let countdownInterval;

function isSameDay(date1, date2) {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
}

function getRelativeDay(date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);

    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
        return {
            past: '',
            future: ''
        }; // Today
    } else if (diffDays === 1) {
        return {
            past: '',
            future: '明日'
        };
    } else if (diffDays === 2) {
        return {
            past: '',
            future: '明後日'
        };
    } else if (diffDays === -1) {
        return {
            past: '昨日',
            future: ''
        };
    } else if (diffDays === -2) {
        return {
            past: '一昨日',
            future: ''
        };
    } else if (diffDays > 0) {
        return {
            past: '',
            future: `${diffDays}日後`
        };
    } else {
        return {
            past: `${Math.abs(diffDays)}日前`,
            future: ''
        };
    }
}

function updateCountdown() {
    const now = new Date();
    const diff = goalDate - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    countdownElement.innerHTML = `${days}日 ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function updateDisplay() {
    currentDateElement.textContent = `${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getDate().toString().padStart(2, '0')}`;
    const relativeDay = getRelativeDay(currentDate);
    relativeDayPastElement.textContent = relativeDay.past;
    relativeDayFutureElement.textContent = relativeDay.future;


    clearInterval(countdownInterval);

    if (isSameDay(currentDate, new Date())) {
        updateCountdown();
        countdownInterval = setInterval(updateCountdown, 1000);
    } else {
        const startOfCurrentDay = new Date(currentDate);
        startOfCurrentDay.setHours(0, 0, 0, 0);

        const startOfGoalDay = new Date(goalDate);
        startOfGoalDay.setHours(0, 0, 0, 0);

        const diff = startOfGoalDay - startOfCurrentDay;
        const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

        countdownElement.innerHTML = `${days}日 00:00:00`;
    }
}

prevDayButton.addEventListener('click', () => {
    currentDate.setDate(currentDate.getDate() - 1);
    updateDisplay();
});

nextDayButton.addEventListener('click', () => {
    currentDate.setDate(currentDate.getDate() + 1);
    updateDisplay();
});

jumpToTodayButton.addEventListener('click', () => {
    currentDate = new Date();
    updateDisplay();
});

updateDisplay();