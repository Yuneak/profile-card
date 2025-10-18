// Get the time element
const timeElement = document.querySelector('[data-testid="test-user-time"]');

// Function to update time in milliseconds
function updateTime() {
  const now = new Date();
  const formattedTime = `${now.toLocaleTimeString()}.${now.getMilliseconds()}`;
  timeElement.textContent = formattedTime;
}

// Update on load
updateTime();

// Optional: keep updating every second
setInterval(updateTime, 1000);
