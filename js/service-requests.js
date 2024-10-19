document.addEventListener("DOMContentLoaded", () => {
    const serviceList = document.getElementById("services");

    async function fetchServices() {
        try {
            const response = await fetch('http://localhost:5000/api/services'); // Ensure this URL is correct
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log("services", data)
            if (data.success) {
                renderServices(data.services);
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error("Error fetching services:", error);
        }
    }

    function renderServices(servicesToRender) {
        serviceList.innerHTML = servicesToRender.map((service, index) => `
            <li class="service-card">
                <div class="service-image" style="background-image: url('${service.image}');"></div>
                <div class="service-details">
                    <h3 class="service-title">${service.title}</h3>
                    <p class="service-provider"><strong>Provider:</strong> ${service.provider}</p>
                    <p class="service-description">${service.description}</p>
                    <p class="service-category"><strong>Category:</strong> ${service.category}</p>
                    <p class="service-location"><strong>Location:</strong> ${service.location}</p>
                    <p class="service-price"><strong>Price:</strong> $${service.price}</p>
                </div>
                <div class="service-footer">
                    <span class="rating-stars">${'★'.repeat(Math.floor(service.rating))} <span class="rating-text">${service.rating}</span></span>
                    <a class="read-more-link" data-index="${index}">See More</a>
                    <button class="btn-small">Contact</button>
                </div>
            </li>
        `).join('');
    }

    fetchServices();

    // Add event listener to "See More" links
    serviceList.addEventListener('click', (event) => {
        if (event.target.classList.contains('read-more-link')) {
            const index = event.target.getAttribute('data-index');
            const service = services[index];
            localStorage.setItem('selectedService', JSON.stringify(service));
            window.location.href = 'service-detail.html'; // Redirect to service detail page
        }
    });

    // Filtering by category
    window.filterByCategory = function(category) {
        const filteredServices = category ? services.filter(service => service.category === category) : services;
        renderServices(filteredServices);
    };

    // Back button logic
    document.getElementById('back-button').addEventListener('click', () => {
        window.history.back(); // This will take the user back to the previous page
    });
});
