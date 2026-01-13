// Countdown Timer JavaScript

// Set the target date for the birthday (year, month, day)
// Month is 0-indexed, so January is 0
const targetDate = new Date(new Date().getFullYear(), 0, 14); // January 14th of current year - Tomorrow!

// If the birthday has already passed this year, set it to next year
if (targetDate < new Date()) {
    targetDate.setFullYear(targetDate.getFullYear() + 1);
}

function updateCountdown() {
    const now = new Date();
    const difference = targetDate - now;

    // Calculate time units
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    // Update the display
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');

    // Add animation effect when numbers change
    animateNumbers();
}

function animateNumbers() {
    const numbers = document.querySelectorAll('.timer-number');
    numbers.forEach(number => {
        number.style.transform = 'scale(1.1)';
        setTimeout(() => {
            number.style.transform = 'scale(1)';
        }, 200);
    });
}

// Initial call to set the countdown immediately
updateCountdown();

// Update the countdown every second
setInterval(updateCountdown, 1000);

// Additional functionality to handle timezone detection
function getTimezoneOffset() {
    const offset = new Date().getTimezoneOffset();
    const sign = offset < 0 ? '+' : '-';
    const absOffset = Math.abs(offset);
    const hours = Math.floor(absOffset / 60);
    const minutes = absOffset % 60;
    
    return `${sign}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

// Display timezone info (optional)
console.log(`Local Timezone Offset: ${getTimezoneOffset()}`);

// Handle cases where the target date is reached
function checkIfReached() {
    const now = new Date();
    if (now >= targetDate) {
        document.querySelector('.timer-text').textContent = "It's Your Birthday! 🎉";
        clearInterval(countdownInterval);
        
        // Optionally redirect to a special page or show a message
        setTimeout(() => {
            alert("Happy Birthday! It's your special day! 🎂");
        }, 1000);
    }
}

// Check if the target date is reached every second
const countdownInterval = setInterval(checkIfReached, 1000);