// Example list of notifications
const notifications = [
    { id: 1, message: 'New event created: Community Clean-up Day', date: '2024-10-15', status: 'Unread' },
    { id: 2, message: 'Health Awareness Camp is scheduled for October 25', date: '2024-10-16', status: 'Read' },
    { id: 3, message: 'Sports Day has been approved', date: '2024-10-17', status: 'Unread' }
];

// Populate notifications into the table
document.addEventListener('DOMContentLoaded', () => {
    const notificationList = document.getElementById('notification-list');
    
    notifications.forEach(notification => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${notification.id}</td>
            <td>${notification.message}</td>
            <td>${notification.date}</td>
            <td>${notification.status}</td>
            <td class="actions">
                <button class="mark-read-btn">Mark as Read</button>
                <button class="delete-btn">Delete</button>
            </td>
        `;
        
        notificationList.appendChild(row);
    });
});
