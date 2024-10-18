// Example list of events
const events = [
    { id: 1, name: 'OriginFest2024', date:'18 to 20th -11-2024',location: 'Atrium, Dedan Kimathi University', status:'Ongoing' },
    { id: 2, name: 'Tree Planting Day', date: '2024-11-06', location: 'N/A', status: 'passed'},
    { id: 3, name: 'Community Clean-up', date: '2024-10-20', location: 'Nyeri Town', status: 'Upcoming' },
    { id: 4, name: 'Health Fair', date: '2024-11-05', location: 'Kabiriuni ShowGround', status: 'Upcoming' },
    
    
];

// Populate events into the table
document.addEventListener('DOMContentLoaded', () => {
    const eventList = document.getElementById('event-list');
    
    events.forEach(event => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${event.id}</td>
            <td>${event.name}</td>
            <td>${event.date}</td>
            <td>${event.location}</td>
            <td>${event.status}</td>
            <td class="actions">
                <button class="approve-btn">View</button>
                <button class="deny-btn">Delete</button>
            </td>
        `;
        
        eventList.appendChild(row);
    });

    // Add event listener to add event button
    document.getElementById('add-event-btn').addEventListener('click', () => {
        document.getElementById('event-modal').style.display = 'block';
    });

    // Close modal when the user clicks on <span> (x)
    document.querySelector('.close-btn').addEventListener('click', () => {
        document.getElementById('event-modal').style.display = 'none';
    });

    // Add new event
    document.getElementById('event-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const newEvent = {
            id: events.length + 1,
            name: document.getElementById('event-name').value,
            date: document.getElementById('event-date').value,
            location: document.getElementById('event-location').value,
            status: 'Upcoming'
        };

        events.push(newEvent);
        addEventToTable(newEvent);
        document.getElementById('event-modal').style.display = 'none';
        this.reset(); // Reset the form
    });
});

// Function to add event to the table
function addEventToTable(event) {
    const eventList = document.getElementById('event-list');
    const row = document.createElement('tr');
    
    row.innerHTML = `
        <td>${event.id}</td>
        <td>${event.name}</td>
        <td>${event.date}</td>
        <td>${event.location}</td>
        <td>${event.status}</td>
        <td class="actions">
            <button class="approve-btn">View</button>
            <button class="deny-btn">Delete</button>
        </td>
    `;
    
    eventList.appendChild(row);
}
