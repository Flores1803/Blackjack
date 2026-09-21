let baraja = [];
const tipos = ["C","D","H","S"];
const especiales = ["A","J","Q","K"]; // 10, A = 10 o 11

// MANEJO DE DOM
const btnPedir = document.querySelector("#btnPedir");
const btnDetener = document.querySelector("#btnDetener");
const btnNuevo = document.querySelector("#btnNuevo");

// SMALL HTML
const puntosHtml = document.querySelectorAll("small");

// INICIALIZAR DIV DE JUGADOR Y COMPUTADORA
const divCartasJugador = document.querySelector("#jugador-cartas");
const divCartasComputadora = document.querySelector("#computadora-cartas");

// PUNTAJES
let puntosJugador = 0;
let puntosComputadora = 0;

// FUNCIONES NUEVA BARAJA
const crearbaraja = () => {
    // CREA UNA BARAJA CON LAS CARTAS DEL 2 AL 10 DE TODO LOS TIPOS
    for(let i = 2; i <= 10; i++){ 
        for(let tipo of tipos){
            baraja.push(i + tipo);
        }
    }
    // AGREGAMOS LAS CARTAS ESPECIALES
    for(let especial of especiales){
        for(let tipo of tipos){
            baraja.push(especial + tipo);
        }
    }
    // ALEAROREAMENTE MEZCLAMOS LAS CARTAS
    baraja = _.shuffle(baraja);
}

crearbaraja();

// FUNCION DE PEDIR CARTA
const pedirCarta = () => {
    if(baraja.length == 0){
        throw "No hay cartas en la baraja"
    }
    const carta = baraja.pop();
    return carta;
};

// FUNCION DE VALOR CARTA
const valorCarta = (carta) => {
    const valor = carta.substring(0,carta.length - 1);
    let puntos = 0;

    if(isNaN(valor)){
        puntos = valor == "A" ? 11 : 10;
    }else{
        puntos = valor * 1;
    }

    return puntos;
};

// FUNCION DE LA COMPUTADORA
const turnoComputadora = (puntosMinimos) => {

    do {
        // SE EJECUTA POR LO MENOS UNA VEZ
        const carta = pedirCarta();

        puntosComputadora = puntosComputadora + valorCarta(carta);
        puntosHtml[1].innerText = puntosComputadora;

        const imgCarta = document.createElement("img");
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add("carta");
        divCartasComputadora.append(imgCarta);

        if(puntosComputadora > 21){
            break;
        }
    } while(puntosComputadora < puntosMinimos && puntosMinimos <= 21);


    // MENSAJE
    setTimeout(() =>{
        if (puntosComputadora === puntosMinimos) {
        alert("Nadie Gana");
        } else if (puntosMinimos > 21) {
            alert("Computadora Gana");
        } else if (puntosComputadora > 21) {
            alert("Jugador Gana");
        } else{
            alert("Computadora Gana");
        }
    },180);
    
};

// FUNCION PEDIR CARTA DESDE EL BOTON
btnPedir.addEventListener("click",() => {
    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta(carta);
    puntosHtml[0].innerText = puntosJugador;

    // CREAR Y MOSTRAR LAS CARTAS
    const imgCarta = document.createElement("img");
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add("carta");
    divCartasJugador.append(imgCarta);

    if(puntosJugador > 21){
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    }else if(puntosJugador == 21){
        btnPedir.disabled = true;
    }
});

// FUNCION DETENER
btnDetener.addEventListener("click", () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
});

btnNuevo.addEventListener("click", () => {
    baraja = [];
    crearbaraja();

    puntosJugador = 0;
    puntosComputadora = 0;

    puntosHtml[0].innerHTML = 0;
    puntosHtml[1].innerHTML = 0;

    divCartasJugador.innerHTML = "";
    divCartasComputadora.innerHTML = "";

    btnPedir.disabled = false;
    btnDetener.disabled = false;
});