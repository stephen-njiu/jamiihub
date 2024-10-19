// Example list of issue reports
const issues = [
    { id: 1, issue: 'Broken Traffic Light', date: '2024-10-08', status: 'Pending' },
    { id: 2, issue: 'Pothole on Main Street', date: '2024-10-10', status: 'Resolved' },
    { id: 3, issue: 'Illegal Dumping', date: '2024-10-11', status: 'In Progress' }
];

// Populate issue reports into the table
document.addEventListener('DOMContentLoaded', () => {
    const issueList = document.getElementById('issue-list');
    
    issues.forEach(issue => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${issue.id}</td>
            <td>${issue.issue}</td>
            <td>${issue.date}</td>
            <td>${issue.status}</td>
            <td class="actions">
                <button class="approve-btn">Resolve</button>
                <button class="deny-btn">Dismiss</button>
            </td>
        `;
        
        issueList.appendChild(row);
    });
});
