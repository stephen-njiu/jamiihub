// Example list of users
const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'User', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Admin', status: 'Inactive' },
    { id: 3, name: 'Sam Wilson', email: 'sam@example.com', role: 'Moderator', status: 'Active' }
];

// Populate users into the table
document.addEventListener('DOMContentLoaded', () => {
    const userList = document.getElementById('user-list');
    
    users.forEach(user => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td>${user.status}</td>
            <td class="actions">
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </td>
        `;
        
        userList.appendChild(row);
    });
});
