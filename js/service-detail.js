document.addEventListener("DOMContentLoaded", () => {
    const service = JSON.parse(localStorage.getItem('selectedService'));

    if (service) {
        document.getElementById('service-title').textContent = service.title;
        document.getElementById('service-provider').textContent = `Provider: ${service.provider}`;
        document.getElementById('service-description').textContent = service.description;
        document.getElementById('service-image').style.backgroundImage = `url('${service.image}')`;
        document.getElementById('service-rating').innerHTML = `${'★'.repeat(Math.floor(service.rating))} <span>${service.rating}</span>`;
    } else {
        document.getElementById('service-details').textContent = 'Service not found';
    }
});
