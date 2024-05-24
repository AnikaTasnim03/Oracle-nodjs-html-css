document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/anika')
        .catch(error => console.error('There has been a problem with your fetch operation:', error));
});
