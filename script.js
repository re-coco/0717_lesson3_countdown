const currentDateElement = document.getElementById('current-date');
const countdownElement = document.getElementById('countdown');
const prevDayButton = document.getElementById('prev-day');
const nextDayButton = document.getElementById('next-day');

const goalDate = new Date('2025-08-31T00:00:00');
let currentDate = new Date();

function updateCountdown() {
    const now = new Date();
    const diff = goalDate - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    countdownElement.innerHTML = `${days}日 ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function updateDate() {
    currentDateElement.textContent = `${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getDate().toString().padStart(2, '0')}`;
}

prevDayButton.addEventListener('click', () => {
    currentDate.setDate(currentDate.getDate() - 1);
    updateDate();
});

nextDayButton.addEventListener('click', () => {
    currentDate.setDate(currentDate.getDate() + 1);
    updateDate();
});

updateDate();
setInterval(updateCountdown, 1000);
