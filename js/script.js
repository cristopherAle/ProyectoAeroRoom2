/* var destinos = ["Amsterdam", "Londres", "Paris", "Frankfurt", "Madrid", "Milan"];
var horariosVuelos = ["00:00","01:00","02:00","03:00","04,00","12:00", "13:00", "15:00", "16:00", "18:00", "23:00"];
var Estados = ["Atrasado", "Abordando", "Cancelado", "A Tiempo", "En Espera"] */

const vuelos = [
    { vuelo: 'AA101', destino: 'Nueva York', hora: '08:00', estado: 'Abordando', puerta: 'A1' },
    { vuelo: 'BA202', destino: 'Londres', hora: '09:30', estado: 'En Espera', puerta: 'B2' },
    { vuelo: 'AF303', destino: 'París', hora: '10:15', estado: 'Cancelado', puerta: 'C3' },
    { vuelo: 'IB404', destino: 'Madrid', hora: '11:00', estado: 'A Tiempo', puerta: 'D4' },
    { vuelo: 'LH505', destino: 'Berlín', hora: '12:30', estado: 'Retrasado', puerta: 'E5' },
    { vuelo: 'DL606', destino: 'Atlanta', hora: '13:00', estado: 'Abordando', puerta: 'F6' },
    { vuelo: 'UA707', destino: 'Chicago', hora: '14:00', estado: 'En Espera', puerta: 'G7' },
    { vuelo: 'KL808', destino: 'Ámsterdam', hora: '15:15', estado: 'Cancelado', puerta: 'H8' },
    { vuelo: 'QF909', destino: 'Sídney', hora: '16:45', estado: 'A Tiempo', puerta: 'I9' }
];



function obtenerVuelosAleatorios(cantidad) {
    return vuelos
        .sort(() => Math.random() - 0.6)
        .slice(0, cantidad);
}

function actualizarTablaVuelos() {
    const cuerpoTabla = document.getElementById('cuerpoTabla');
    const vuelosAleatorios = obtenerVuelosAleatorios(9);

    cuerpoTabla.innerHTML = '';
    var colorEstado = 'green'
    var colorLetra = 'black'
    var imgEstado = 'Abordando.svg'

    vuelosAleatorios.forEach(vuelo => {

        switch(vuelo.estado){
                case 'Abordando':
                    colorEstado = 'green';
                    colorLetra = 'white';
                    imgEstado = 'Abordando.svg';
                    break;
                case 'En Espera':
                    colorEstado = 'yellow';
                    colorLetra = 'black';
                    imgEstado = 'EnEspera.svg';
                    break;
                case 'Cancelado':
                    colorEstado = 'red';
                    colorLetra = 'white';
                    imgEstado = 'Cancelado.svg';
                    break;
                case 'A Tiempo':
                    colorEstado = 'blue';
                    colorLetra = 'white';
                    imgEstado = 'Atiempo.svg';
                    break;
                case 'Retrasado':
                    colorEstado = 'orange';
                    colorLetra = 'black';
                    imgEstado = 'Retrasado.svg';
                    break;
                default: colorEstado = 'green';
                colorLetra = 'white';
                imgEstado = 'Abordando.svg';
                break;
        }

        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td><img src="assets/img/${imgEstado}" width='24px' alt=""></td>
            <td>${vuelo.vuelo}</td>
            <td>${vuelo.destino}</td>
            <td>${vuelo.hora}</td>
            <td style = "background: ${colorEstado}; color:${colorLetra}"> ${vuelo.estado}</td>
            <td>${vuelo.puerta}</td>
        `;
        cuerpoTabla.appendChild(fila);
    });
}

actualizarTablaVuelos();
setInterval(actualizarTablaVuelos, 5000);