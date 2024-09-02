document.getElementById('opcion1').addEventListener('change', function() {
    const returnDateInput = document.getElementById('fechavuelta');
    returnDateInput.disabled = true;
    returnDateInput.value = ''; // Limpiar el valor de la fecha de retorno si se deshabilita
});

document.getElementById('opcion2').addEventListener('change', function() {
    const returnDateInput = document.getElementById('fechavuelta');
    returnDateInput.disabled = false;
});

document.getElementById('fechaida').addEventListener('change', function() {
    const returnDateInput = document.getElementById('fechavuelta');
    const departureDate = new Date(this.value);

    // Establecer la fecha mínima de retorno como la fecha de ida + 1 día
    let minReturnDate = new Date(departureDate);
    minReturnDate.setDate(minReturnDate.getDate() + 1);

    // Formatear la fecha mínima en formato yyyy-mm-dd
    const minReturnDateFormatted = minReturnDate.toISOString().split('T')[0];

    returnDateInput.min = minReturnDateFormatted;

    // Si la fecha de retorno actual es menor que la fecha mínima permitida, limpiarla
    if (returnDateInput.value && new Date(returnDateInput.value) < minReturnDate) {
        returnDateInput.value = '';
    }
});

document.getElementById('searchFlight').addEventListener('click', function() {
    const departureDate = document.getElementById('fechaida').value;
    const returnDate = document.getElementById('fechavuelta').value;
    const tripType = document.querySelector('input[name="opciones"]:checked').value;

    // Validar si se seleccionó la opción de ida y vuelta y si la fecha de retorno es válida
    if (tripType === 'opcion2' && (!returnDate || returnDate <= departureDate)) {
        alert('La fecha de retorno debe ser posterior a la fecha de ida.');
        return;
    }

    // Crear una lista de vuelos disponibles (esto normalmente vendría de una API o una base de datos)
    const availableFlights = [
        { airline: 'Aerolínea A', city: 'Santiago', date: '2024-09-10', price: 150 },
        { airline: 'Aerolínea B', city: 'Lima', date: '2024-09-15', price: 200 },
        { airline: 'Aerolínea C', city: 'Bogotá', date: '2024-09-20', price: 250 },
        { airline: 'Aerolínea D', city: 'Buenos Aires', date: '2024-09-10', price: 180 },
    ];

    // Filtrar vuelos por la fecha de salida seleccionada
    const filteredFlights = availableFlights.filter(flight => flight.date === departureDate);

    // Obtener el div donde se van a mostrar los vuelos disponibles
    let flightsListDiv = document.getElementById('flightsList');
    flightsListDiv.innerHTML = '';  // Limpiar la lista de vuelos antes de agregar nuevos

    // Verificar si hay vuelos disponibles
    if (filteredFlights.length > 0) {
        // Crear una tabla para mostrar los vuelos
        let table = document.createElement('table');
        table.classList.add('table', 'table-striped', 'table-hover');

        // Crear encabezados de la tabla
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Aerolínea</th>
                    <th>Ciudad</th>
                    <th>Fecha</th>
                    <th>Precio</th>
                    <th>Acción</th>
                </tr>
            </thead>
            <tbody></tbody>
        `;

        // Agregar las filas de vuelos disponibles
        filteredFlights.forEach(flight => {
            let row = document.createElement('tr');
            row.innerHTML = `
                <td>${flight.airline}</td>
                <td>${flight.city}</td>
                <td>${flight.date}</td>
                <td>$${flight.price}</td>
                <td><button class="selectFlight btn btn-primary" data-price="${flight.price}">Seleccionar</button></td>
            `;
            table.querySelector('tbody').appendChild(row);
        });

        // Añadir la tabla al div
        flightsListDiv.appendChild(table);

        // Añadir la lógica para seleccionar un vuelo
        document.querySelectorAll('.selectFlight').forEach(button => {
            button.addEventListener('click', function() {
                const passengers = parseInt(document.getElementById('adultos').value);
                const children = parseInt(document.getElementById('ninos').value);
                const infantes = parseInt(document.getElementById('infantes').value);
                const totalPeople = passengers + children + infantes;
                const pricePerPerson = parseInt(this.getAttribute('data-price'));
                const totalPrice = pricePerPerson * totalPeople;

                // Mostrar el precio total en un modal o alerta
                alert(`Total: $${totalPrice}`);
            });
        });

    } else {
        // Mostrar un mensaje si no hay vuelos disponibles
        flightsListDiv.innerHTML = '<p>No hay vuelos disponibles para la fecha seleccionada.</p>';
    }
});
