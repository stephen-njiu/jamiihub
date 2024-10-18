document.addEventListener('DOMContentLoaded', () => {
    // Example: Fetch recent activity dynamically
    const recentActivity = [
        { user: 'Jane Doe', action: 'submitted a service request', date: '2024-10-18' },
        { user: 'John Smith', action: 'reported an issue', date: '2024-10-17' }
    ];

    const activityList = document.querySelector('.recent-activity ul');
    recentActivity.forEach(activity => {
        const listItem = document.createElement('li');
        listItem.textContent = `${activity.user} ${activity.action} on ${activity.date}.`;
        activityList.appendChild(listItem);
    });
});
