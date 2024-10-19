// scripts.js
let userPoints = 0;
const badges = [];

document.addEventListener('DOMContentLoaded', function() {
    const notificationsSection = document.querySelector('.notifications p');

    // Function to simulate fetching new notifications
    function fetchNotifications() {
        const notifications = [
            "You have a new service request!",
            "Your issue report has been resolved.",
            "New community event scheduled for this weekend!"
        ];

        notificationsSection.textContent = notifications[Math.floor(Math.random() * notifications.length)];
    }

    setInterval(fetchNotifications, 5000);
});

// Function to earn points and potentially unlock a badge
function earnPoints() {
    userPoints += 10; // Award points for completing a task
    document.getElementById('user-points').textContent = userPoints;

    // Check for badges
    if (userPoints >= 50 && !badges.includes('Community Contributor')) {
        badges.push('Community Contributor');
        updateBadges();
    }
}

// Function to update badge display
function updateBadges() {
    const badgeList = document.getElementById('badge-list');
    badgeList.innerHTML = ''; // Clear the existing list
    badges.forEach(badge => {
        const listItem = document.createElement('li');
        listItem.textContent = badge;
        badgeList.appendChild(listItem);
    });
}
