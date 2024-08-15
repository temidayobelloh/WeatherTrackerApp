document.getElementById('cityInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); 
        const UserInput = document.getElementById('cityInput').value;
        if (UserInput === "") {
            alert('Please enter a location');
        } else {
            fetchWeatherData(UserInput);
        }
    }
});

document.getElementById('weatherBtn').addEventListener('click', function() {
    const UserInput = document.getElementById('cityInput').value;
    if (UserInput === "") {
        alert('Please input a location');
    } else {
        fetchWeatherData(UserInput);
    }
});

function fetchWeatherData(location) {
    const apiKey = '57fce59d263fbb0d4c043a81392345c5';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`; // Use 'metric' for Celsius

    // Clear previous data
    document.getElementById('weatherInfo').classList.add('hidden');
    document.getElementById('error').classList.add('hidden');
    
    // Reset input field (optional)
    document.getElementById('cityInput').value = '';

    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then((data) => {
            // Update the weather information
            document.getElementById('cityName').textContent = data.name;
            document.getElementById('temperature').innerHTML = `Temperature: <span>${data.main.temp}°C</span>`;
            document.getElementById('conditions').innerHTML = `Conditions: <span>${data.weather[0].description}</span>`;
            
            // Display weather information
            document.getElementById('weatherInfo').classList.remove('hidden');
            document.getElementById('error').classList.add('hidden');
        })
        .catch((error) => {
            // Display error message
            document.getElementById('error').textContent = error.message;
            document.getElementById('error').classList.remove('hidden');
            document.getElementById('weatherInfo').classList.add('hidden');
        });
}
