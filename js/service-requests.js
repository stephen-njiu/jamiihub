document.addEventListener("DOMContentLoaded", () => {
    const serviceList = document.getElementById("services");
    let services = []; // Store fetched services in this array
    const inquiryModal = document.getElementById("inquiryModal");
    const closeButton = document.querySelector(".close-button");
    const submitInquiryButton = document.getElementById("submitInquiry");
    let selectedServiceId = null; // To store the selected service ID for the inquiry

    async function fetchServices() {
        try {
            const response = await fetch('https://jamiihubserver.onrender.com/api/services'); 
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log("services", data);
            if (data.success) {
                services = data.services; // Save services to global variable
                renderServices(services);
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
                    <a class="read-more-link" data-index="${index}">See More</a>
                    <button class="btn-small inquiry-button" data-service-id="${service.id}">Make Inquiry</button>
                </div>
            </li>
        `).join('');
    }

    fetchServices();

    // Add event listener to service list for handling clicks
    serviceList.addEventListener('click', (event) => {
        if (event.target.classList.contains('read-more-link')) {
            const index = event.target.getAttribute('data-index');
            const service = services[index];
            localStorage.setItem('selectedService', JSON.stringify(service));
            window.location.href = 'service-detail.html'; // Redirect to service detail page
        } else if (event.target.classList.contains('inquiry-button')) {
            selectedServiceId = event.target.getAttribute('data-service-id');
            openModal();
        }
    });

    // Function to open the inquiry modal
    function openModal() {
        inquiryModal.style.display = "block";
    }

    // Close modal event
    closeButton.addEventListener("click", () => {
        inquiryModal.style.display = "none";
    });

    // Submit inquiry
    submitInquiryButton.addEventListener("click", () => {
        const message = document.getElementById("inquiryMessage").value;
        if (message) {
            sendInquiry(selectedServiceId, message);
            inquiryModal.style.display = "none"; // Close the modal after sending
            document.getElementById("inquiryMessage").value = ""; // Clear the textarea
        } else {
            alert("Please enter your inquiry message.");
        }
    });

    // Function to send the inquiry message to the server
    async function sendInquiry(serviceId, message) {
        try {
            const response = await fetch(`https://jamiihubserver.onrender.com/api/services/${serviceId}/inquiry`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            if (data.success) {
                alert('Your inquiry has been sent successfully!');
            } else {
                alert('Failed to send inquiry: ' + data.message);
            }
        } catch (error) {
            console.error("Error sending inquiry:", error);
            alert('There was an error sending your inquiry. Please try again later.');
        }
    }

    // Filtering by category
    window.filterByCategory = function(category) {
        const filteredServices = category ? services.filter(service => service.category === category) : services;
        renderServices(filteredServices);
    };

    // Back button logic
    document.getElementById('back-button').addEventListener('click', () => {
        window.history.back(); // This will take the user back to the previous page
    });

    // Close modal when clicking outside of it
    window.onclick = function(event) {
        if (event.target === inquiryModal) {
            inquiryModal.style.display = "none";
        }
    };
});
