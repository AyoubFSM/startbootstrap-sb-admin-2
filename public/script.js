async function fetchData() {
  try {
    const response = await fetch('/data/latest');
    if (!response.ok) throw new Error('Failed to fetch data');
    const data = await response.json();
    const { temperature, humidity , numConnected, signalStrength} = data; // Destructure the variables

    const dataDisplay = document.getElementById('humidtyair');
    const humdityd_sol_display = document.getElementById('humidtysol');

    const signal_wifi = document.getElementById("signalwifi");
    const devices_connected = document.getElementById('numconnected');

    const temperature_display = document.getElementById('temperature');

    const tempchart_display = document.getElementById('tempchart');



    signal_wifi.innerHTML = `
     <h2 class="mb-3 text-dark font-weight-bold" >${signalStrength}</h2>
    `;

    devices_connected.innerHTML = `
     <h2 class="mb-4 text-dark font-weight-bold" >${numConnected}</h2>
    `;





    dataDisplay.innerHTML = `
      <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">${humidity} %</div>
      <div class="col-auto" >

                                                </div>
                                                <div class="col">
                                                    <div class="progress progress-sm mr-2">
                                                        <div class="progress-bar bg-info" role="progressbar"
                                                            style="width: ${humidity}%" aria-valuenow=${humidity} aria-valuemin="0"
                                                            aria-valuemax="100"></div>
                                                    </div>
                                                </div>
    `;

    temperature_display.innerHTML = `
      <div class="h5 mb-0 font-weight-bold text-gray-800">${temperature} °C</div>
    `;

  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Fetch data every 5 seconds
setInterval(fetchData, 3000);
fetchData();
