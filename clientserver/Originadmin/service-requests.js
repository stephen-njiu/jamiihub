// Example list of service requests
const requests = [
    { id: 1, service: 'Repair Broken Streetlight', date: '2024-10-10', status: 'Pending' },
    { id: 2, service: 'Fix Pothole', date: '2024-10-12', status: 'In Progress' },
    { id: 3, service: 'Upgrade Public Park', date: '2024-10-14', status: 'Completed' }
];

// Populate service requests into the table
document.addEventListener('DOMContentLoaded', () => {
    const requestList = document.getElementById('request-list');
    
    requests.forEach(request => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${request.id}</td>
            <td>${request.service}</td>
            <td>${request.date}</td>
            <td>${request.status}</td>
            <td class="actions">
                <button class="approve-btn">Approve</button>
                <button class="deny-btn">Deny</button>
            </td>
        `;
        
        requestList.appendChild(row);
    });
});
