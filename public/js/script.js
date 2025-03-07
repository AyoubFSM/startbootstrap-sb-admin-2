
            let pumpRunning = false; // Track the state of the pump
            let autoHumiditeSolActive = false; // Track the state of auto humidity for soil
            let autoHumiditeAirActive = false; // Track the state of auto humidity for air
            let currentToggle = ""; // Track which toggle is being confirmed
            // Function to show the confirmation modal
            function confirmTogglePump() {
                document.getElementById('confirmModal').classList.remove('hidden');
            }

            // Function to toggle the pump state
            function togglePump(confirm) {
                document.getElementById('confirmModal').classList.add('hidden'); // Hide modal
                if (!confirm) return; // If user clicks "Non", do nothing

                pumpRunning = !pumpRunning; // Toggle state

                const button = document.getElementById('pumpButton');
                const icon = document.getElementById('pumpIcon');
                const text = document.getElementById('pumpText');

                if (pumpRunning) {
                    // Change to "Arrêt d'Urgence"
                    button.classList.replace('bg-gray-100', 'bg-red-50');
                    button.classList.replace('hover:bg-green-100', 'hover:bg-red-100');
                    icon.classList.replace('text-green-600', 'text-red-600'); // Change icon to red
                    icon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />`;
                    text.textContent = "Arrêt d'Urgence";
                } else {
                    // Change back to "Démarrage de Pompe"
                    button.classList.replace('bg-red-50', 'bg-gray-100');
                    button.classList.replace('hover:bg-red-100', 'hover:bg-green-100');
                    icon.classList.replace('text-red-600', 'text-green-600'); // Change icon to green
                    icon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M12 4v16m8-8H4"></path>`;
                    text.textContent = "Démarrage de Pompe";
                }
            }

            // Function to show the confirmation modal for auto humidity (soil)
            function confirmToggleAutoHumiditeSol() {
                currentToggle = "sol";
                document.getElementById('modalContent').textContent = autoHumiditeSolActive
                    ? "Voulez-vous désactiver la fonction Humidité du Sol ?"
                    : "Voulez-vous activer la fonction Humidité du Sol ?";
                document.getElementById('infoModal').classList.remove('hidden');
            }

            // Function to show the confirmation modal for Auto Humidité Air
            function confirmToggleAutoHumiditeAir() {
                currentToggle = "air";
                document.getElementById('modalContent').textContent = autoHumiditeAirActive
                    ? "Voulez-vous désactiver la fonction Humidité de l'Air ?"
                    : "Voulez-vous activer la fonction Humidité de l'Air ?";
                document.getElementById('infoModal').classList.remove('hidden');
            }

            // Function to handle the confirmation action for auto humidity
            function confirmAction(confirm) {
                document.getElementById('infoModal').classList.add('hidden');
                if (!confirm) return;

                if (currentToggle === "sol") {
                    autoHumiditeSolActive = !autoHumiditeSolActive;
                    let button = document.getElementById('autoHumiditeSolButton');
                    let text = document.getElementById('solButtonText');
                    let icon = document.getElementById('solIcon');

                    if (autoHumiditeSolActive) {
                        text.textContent = "Désactiver Auto par Humidité Sol";
                        button.classList.replace('bg-green-50', 'bg-red-50');
                        button.classList.replace('hover:bg-green-100', 'hover:bg-red-100');
                        icon.classList.replace('text-green-600', 'text-red-600'); // Change icon to red
                    } else {
                        text.textContent = "Auto par Humidité Sol";
                        button.classList.replace('bg-red-50', 'bg-green-50');
                        button.classList.replace('hover:bg-red-100', 'hover:bg-green-100');
                        icon.classList.replace('text-red-600', 'text-green-600'); // Change icon to green
                    }
                }

                if (currentToggle === "air") {
                    autoHumiditeAirActive = !autoHumiditeAirActive;
                    let button = document.getElementById('autoHumiditeAirButton');
                    let text = document.getElementById('airButtonText');
                    let icon = document.getElementById('airIcon');

                    if (autoHumiditeAirActive) {
                        text.textContent = "Désactiver Auto par Humidité Air";
                        button.classList.replace('bg-yellow-50', 'bg-orange-50');
                        button.classList.replace('hover:bg-yellow-100', 'hover:bg-orange-100');
                        icon.classList.replace('text-yellow-600', 'text-orange-600'); // Change icon to orange
                    } else {
                        text.textContent = "Auto par Humidité Air";
                        button.classList.replace('bg-orange-50', 'bg-yellow-50');
                        button.classList.replace('hover:bg-orange-100', 'hover:bg-yellow-100');
                        icon.classList.replace('text-orange-600', 'text-yellow-600'); // Change icon to yellow
                    }
                }
            }
            // Modal Control Functions
            function showControlInfo(type, title, content) {
                console.log(`Showing info for: ${type}`);
                document.getElementById('modalTitle').textContent = title;
                document.getElementById('modalContent').textContent = content;
                document.getElementById('infoModal').classList.remove('hidden');
            }

            function closeModal() {
                document.getElementById('infoModal').classList.add('hidden');
            }



            // Event Listeners
            document.addEventListener('DOMContentLoaded', () => {
                document.getElementById('infoModal').addEventListener('click', e => {
                    if (e.target === e.currentTarget) closeModal();
                });

                document.getElementById('timerPopup').addEventListener('click', e => {
                    if (e.target === e.currentTarget) closeTimer();
                });
            });
            // Update Signal Strength
            function updateSignal(humiditysol) {
                const signalElement = document.getElementById("signalwifi");
                signalElement.innerText = humiditysol + "%";
            }

            // Update Soil Humidity
            function updateHumidity(humiditysol) {
                const humidityElement = document.getElementById("humidity");
                humidityElement.innerText = humiditysol + "%";
            }

            // Update Connected Devices
            function updateDevices(connectedDevices) {
                const devicesElement = document.getElementById("numconnected");
                devicesElement.innerText = connectedDevices + "%";
            }

            // Update Temperature
            function updateTemperature(temp) {
                const tempElement = document.getElementById("temperature");
                tempElement.innerText = temp;
            }



            // Initialize and Update Functions
            let humiditysol = parseFloat(document.getElementById("signalwifi").innerText);
            let temperature = parseFloat(document.getElementById("temperature").innerText);
            let connectedDevices = parseFloat(document.getElementById("numconnected").innerText);

            setInterval(() => {
                updateSignal(humiditysol);
                updateHumidity(humiditysol);
                updateDevices(connectedDevices);
                updateTemperature(temperature);
            }, 3000);

            let timerInterval;
            let timeLeft = 0;

            function showTimerControl() {
                document.getElementById('timerPopup').classList.remove('hidden');
            }

            function closeTimer() {
                document.getElementById('timerPopup').classList.add('hidden');
                if (timeLeft > 0) {
                    document.getElementById('miniTimer').classList.remove('hidden');
                }
            }

            function startTimer() {
                const hours = parseInt(document.getElementById('hours').value) || 0;
                const minutes = parseInt(document.getElementById('minutes').value) || 0;
                const seconds = parseInt(document.getElementById('seconds').value) || 0;

                timeLeft = (hours * 3600) + (minutes * 60) + seconds;

                if (timeLeft > 0) {
                    updateDisplay();
                    clearInterval(timerInterval);
                    timerInterval = setInterval(() => {
                        timeLeft--;
                        updateDisplay();
                        if (timeLeft <= 0) {
                            clearInterval(timerInterval);
                            alert("Temps écoulé ! Irrigation terminée.");
                            document.getElementById('miniTimer').classList.add('hidden');
                        }
                    }, 1000);
                }
            }

            function pauseTimer() {
                clearInterval(timerInterval);
                timeLeft = 0; // Reset timer
                updateDisplay(); // Update UI
                document.getElementById('miniTimer').classList.add('hidden');
                document.getElementById('timerPopup').classList.add('hidden');
                hideCancelConfirmation(); // Hide confirmation popup
            }

            // New functions for confirmation flow
            function showCancelConfirmation() {
                document.getElementById('cancelConfirmation').classList.remove('hidden');
            }

            function hideCancelConfirmation() {
                document.getElementById('cancelConfirmation').classList.add('hidden');
            }

            function confirmCancel() {
                pauseTimer(); // Proceed with cancellation
            }
            function updateDisplay() {
                const hours = Math.floor(timeLeft / 3600);
                const minutes = Math.floor((timeLeft % 3600) / 60);
                const seconds = timeLeft % 60;

                const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
                document.getElementById('countdown').textContent = formattedTime;
                document.getElementById('miniCountdown').textContent = formattedTime;
            }
            // Dark Mode Toggle
document.getElementById('darkModeButton').addEventListener('click', function () {
    const body = document.body;
    const darkModeIcon = document.getElementById('darkModeIcon');

    // Toggle dark mode class
    body.classList.toggle('dark-mode');

    // Update icon and text
    if (body.classList.contains('dark-mode')) {
        darkModeIcon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('darkMode', 'enabled'); // Save preference
    } else {
        darkModeIcon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('darkMode', 'disabled'); // Save preference
    }
});

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    document.getElementById('darkModeIcon').classList.replace('fa-moon', 'fa-sun');
}

            // Logout Button Functionality
            document.getElementById('logoutButton').addEventListener('click', function () {
                // Show the logout confirmation popup
                document.getElementById('logoutPopup').classList.remove('hidden');
            });

            // Close (×) Button Functionality
            function closeLogout() {
                // Hide the popup
                document.getElementById('logoutPopup').classList.add('hidden');
            }

            // Cancel Button Functionality
            function cancelLogout() {
                // Hide the popup
                document.getElementById('logoutPopup').classList.add('hidden');
            }

            // Confirm Button Functionality
            function confirmLogout() {
                // Clear the session storage
                sessionStorage.removeItem('isLoggedIn');
                // Redirect to the login page
                window.location.href = 'login.html';
            }

            // Check if the user is logged in by looking for a flag in sessionStorage
            if (sessionStorage.getItem('isLoggedIn') !== 'true') {
                window.location.href = 'login.html'; // Redirect to login if not logged in
            }