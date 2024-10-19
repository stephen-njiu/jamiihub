// Example list of feedback
const feedbacks = [
    { id: 1, user: 'Alice', feedback: 'Great app! Very helpful.', date: '2024-10-12', status: 'New' },
    { id: 2, user: 'Bob', feedback: 'I encountered a bug while reporting an issue.', date: '2024-10-13', status: 'Pending' },
    { id: 3, user: 'Charlie', feedback: 'Please add more service options.', date: '2024-10-14', status: 'Resolved' }
];

// Populate feedback into the table
document.addEventListener('DOMContentLoaded', () => {
    const feedbackList = document.getElementById('feedback-list');
    
    feedbacks.forEach(feedback => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${feedback.id}</td>
            <td>${feedback.user}</td>
            <td>${feedback.feedback}</td>
            <td>${feedback.date}</td>
            <td>${feedback.status}</td>
            <td class="actions">
                <button class="respond-btn">Respond</button>
                <button class="delete-btn">Delete</button>
            </td>
        `;
        
        feedbackList.appendChild(row);
    });
});
