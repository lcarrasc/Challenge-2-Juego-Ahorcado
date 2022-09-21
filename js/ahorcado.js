
/*****************************
 *   Colores de Elementos 
 * ****************************/

const horcaColor = "#6A4A0A";  
const AhorcadoSanoColor = "#FDDDCA";
const AhorcadoSinAireColor = "#DDDD26";
const AhorcadoColor = "#7727DB";
const letrasCorrectasColor = "#0BB536";
const zonaLetrasCorrectasColor = "#0A3871";
const letrasIncorrectasColor = "#FF0000";
const baseJuegoColor = "#A2D9E3"; 
const cuerpoColor = "#000000"

/*********************************
 * Tipos y tamaños de Letras 
 ***********************************/
const tamanoLetrasCorrectas = "90px Arial";
const tamanoLetrasIncorrectas = "36px Arial";


/*****************************************************
 * Informacion de contexto del canvas para dibujar 
 ***************************************************/

const anchoCanvas = 1200;
const altoCanvas = 880;

/************************************************
 * Valores de posición y tamaño de la horca 
 ************************************************/
const horcaBaseLargo = 450;
const horcaBasePosicionHorizontal = 375;
const horcaBasePosicionVertical = 600;
const horcaMastilVerticalLargo = 500;
const horcaMastilHorizontalLargo = 200;
const horcaMastilPosicionHorizontal = 525;
const horcaCuerdalargo = 80;

/**************************************************
 * Valores y tamaños de las letras utilizadas 
 **************************************************/

const largoLineaLetrasCorrectas = 60;
const largoEspacioLineasLetrasCorrectas = 36;
const posicionVerticalLineasLetrasCorrectas = horcaBasePosicionVertical + 130;
const posicionVerticalLetrasIncorrectas = posicionVerticalLineasLetrasCorrectas + 80;
const largoEspacioLineasLetrasInorrectas = 36;
const largoLineaLetrasInorrectas = 36;
let posicionHorizontalLetrasIncorrectas = 375;
let poscionInicialLetrasCorrectas = 0;
let espacioOcuparLetrasCorrectas = 0;


/***********************************************
 * Informacion y valores para seguimiento del juego 
 ******************************************************/

const intentos = 8;
const expresion = { letrasValidas: /^[A-Z]{1,8}$/ };

let zonajuego = document.getElementById("tablero-ahorcado").getContext("2d");
let letrasEncontradas = 0;
let letrasErradas = 0;
let finjuego = false;
let letrasMalas = [];
let letrasCorrectas = [];
let palabraSeleccionada = "";
let palabrasSecretas =  ['HOLA', 'CAMELLO', 'ZANAHORIA', 'PERICO', 'ARBOL', 'ARMADILLO'];


document.getElementById("sector-agregar-palabra").style.display = "none";
document.getElementById("sector-jugar").style.display = "none";
   


/***********************************************
 * * Funciones que validan el estado del juego
 ***********************************************/

/* funcion que valida si se ha cumplido el juego y dibuja el mensaje final */
function VerificarJuego() {

    if (letrasEncontradas == palabraSeleccionada.length) {
        
        zonajuego.fillStyle = "#62BB6D";
        zonajuego.font = tamanoLetrasIncorrectas;
        zonajuego.fillText("Ganaste,", 800, 300);
        zonajuego.fillText("Felicidades!!", 800, 340);

        finjuego = true;
        
    }

    if ( letrasErradas == intentos) {
        zonajuego.fillStyle = "#D64313";
        zonajuego.font = tamanoLetrasIncorrectas;
        zonajuego.fillText("Fin del juego...", 800, 300); 
        zonajuego.fillText("No salvaste al Ahorcado", 800, 340); 
        finjuego = true;
    }
}


/* Funcion que selecciona al azar una palabra del arreglo de palabras */
function elegirPalabra () {

    let palabraSecreta = palabrasSecretas[Math.floor(Math.random() * palabrasSecretas.length)];
    palabraSeleccionada = palabraSecreta;
    return (palabraSecreta);

}



/********************************
 * Funciones de Dibujo 
 *******************************/

/* Establece el color de fondo del Canvas */
function dibujarZonaAhorcado() {

    zonajuego.fillStyle = baseJuegoColor;
    zonajuego.fillRect(0,0,anchoCanvas,altoCanvas);
   
}

/* Funcion Generica para dibujar las líneas de la horca */
function dibujarLineasHorca (grosor,color, posicionX, incrementoX, posicionY, incrementoY) {

    zonajuego.beginPath();
    zonajuego.moveTo(posicionX,posicionY);
    zonajuego.lineTo(posicionX + incrementoX,posicionY + incrementoY);

    zonajuego.strokeStyle = color;
    zonajuego.lineWidth = grosor;
    zonajuego.lineCap = "round";
    zonajuego.lineJoin = "round";
    zonajuego.stroke();
    zonajuego.closePath();
   
}

/* Funciones para dibujar la cabeza del ahorcado */
function dibujarCabezaSano(color, X, Y) {

  let radioCabeza = 50;
  let centroXCirculo = X ;
  let centroYCirculo = Y + radioCabeza;

  /* Dibujo de la Cabeza */
  zonajuego.fillStyle = color;
  zonajuego.lineWidth = 7;
  zonajuego.beginPath();
  zonajuego.arc(centroXCirculo, centroYCirculo, radioCabeza, 0, 2 * Math.PI, false);
  zonajuego.fillStyle = color;
  zonajuego.fill();
  zonajuego.strokeStyle = "#000000";
  zonajuego.stroke();
  zonajuego.closePath();

  /* Dibujo ojo izquierdo */
  zonajuego.lineWidth = 3;
  zonajuego.fillStyle = "#FFFFFF";
  zonajuego.beginPath();
  zonajuego.arc(centroXCirculo-radioCabeza/3, centroYCirculo-radioCabeza/3, 8, 0, 2 * Math.PI, false);
  zonajuego.fill();
  zonajuego.strokeStyle = "#000000";
  zonajuego.stroke();
  zonajuego.closePath();

  /* Dibujo ojo derecho */
  zonajuego.lineWidth = 3;
  zonajuego.fillStyle = "#FFFFFF";
  zonajuego.beginPath();
  zonajuego.arc(centroXCirculo+radioCabeza/3, centroYCirculo-radioCabeza/3, 8, 0, 2 * Math.PI, false);
  zonajuego.fill();
  zonajuego.strokeStyle = "#000000";
  zonajuego.stroke();
  zonajuego.closePath();

  /* Dibujo de la nariz */ 
  zonajuego.lineWidth = 5;
  zonajuego.beginPath();
  zonajuego.moveTo(centroXCirculo, centroYCirculo-5);
  zonajuego.lineTo(centroXCirculo-12, centroYCirculo+7);
  zonajuego.moveTo(centroXCirculo-12, centroYCirculo+7);
  zonajuego.lineTo(centroXCirculo, centroYCirculo+7);
  zonajuego.strokeStyle = "#000000";
  zonajuego.stroke();
  zonajuego.closePath();

  /* Dibujo de la boca */
  zonajuego.lineWidth = 5;
  zonajuego.beginPath();
  zonajuego.arc(centroXCirculo, centroYCirculo+10, 27, 0, (1 * Math.PI), false);
  zonajuego.strokeStyle = "#000000";
  zonajuego.stroke();
  zonajuego.closePath();

}

function dibujarCabezaAhorcado(color, X, Y) {

    let radioCabeza = 50;
    let centroXCirculo = X ;
    let centroYCirculo = Y + radioCabeza;

    /* Dibujo de la  cabeza */
    zonajuego.fillStyle = color;
    zonajuego.lineWidth = 7;
    zonajuego.beginPath();
    zonajuego.arc(centroXCirculo, centroYCirculo, radioCabeza, 0, 2 * Math.PI, false);
    zonajuego.fillStyle = color;
    zonajuego.fill();
    zonajuego.strokeStyle = "#000000";
    zonajuego.stroke();
    zonajuego.closePath();
  
     /* Dibujo de la  nariz */
    zonajuego.moveTo(centroXCirculo, centroYCirculo-5);
    zonajuego.lineTo(centroXCirculo-12, centroYCirculo+7);
    zonajuego.moveTo(centroXCirculo-12, centroYCirculo+7);
    zonajuego.lineTo(centroXCirculo, centroYCirculo+7);
    zonajuego.strokeStyle = "#000000";
    zonajuego.stroke();
    zonajuego.closePath();

    /* Dibujo ojo izquierdo */
    zonajuego.lineWidth = 5;
    zonajuego.beginPath();
    zonajuego.moveTo(centroXCirculo-radioCabeza/3-6, centroYCirculo-radioCabeza/3+6);
    zonajuego.lineTo(centroXCirculo-radioCabeza/3+6, centroYCirculo-radioCabeza/3-6);
    zonajuego.moveTo(centroXCirculo-radioCabeza/3+6, centroYCirculo-radioCabeza/3+6);
    zonajuego.lineTo(centroXCirculo-radioCabeza/3-6, centroYCirculo-radioCabeza/3-6);
    zonajuego.strokeStyle = "#000000";
    zonajuego.stroke();
    zonajuego.closePath();

    /* Dibujo ojo derecho */

    zonajuego.lineWidth = 5;
    zonajuego.beginPath();
    zonajuego.moveTo(centroXCirculo+radioCabeza/3-6, centroYCirculo+radioCabeza/3+6);
    zonajuego.lineTo(centroXCirculo+radioCabeza/3+6, centroYCirculo+radioCabeza/3-6);
    zonajuego.moveTo(centroXCirculo+radioCabeza/3+6, centroYCirculo+radioCabeza/3+6);
    zonajuego.lineTo(centroXCirculo+radioCabeza/3-6, centroYCirculo+radioCabeza/3-6);
    zonajuego.strokeStyle = "#000000";
    zonajuego.stroke();
    zonajuego.closePath();

    /* Dibujo de la Boca */
    zonajuego.lineWidth = 5;
    zonajuego.beginPath();
    zonajuego.moveTo(centroXCirculo-35, centroYCirculo+10);
    zonajuego.lineTo(centroXCirculo-10, centroYCirculo+35);
    zonajuego.strokeStyle = "#000000";
    zonajuego.stroke();
    zonajuego.closePath();
    
  }

function dibujarCabezaSinAire(color, X, Y ) {

    let radioCabeza = 50;
    let centroXCirculo = X ;
    let centroYCirculo = Y + radioCabeza;

    /* Dibujo de la cabeza */
    zonajuego.fillStyle = color;
    zonajuego.lineWidth = 7;
    zonajuego.beginPath();
    zonajuego.arc(centroXCirculo, centroYCirculo, radioCabeza, 0, 2 * Math.PI, false);
    zonajuego.fillStyle = color;
    zonajuego.fill();
    zonajuego.strokeStyle = "#000000";
    zonajuego.stroke();
    zonajuego.closePath();

    /* Dibujo de la  nariz */
    zonajuego.moveTo(centroXCirculo, centroYCirculo-5);
    zonajuego.lineTo(centroXCirculo-12, centroYCirculo+7);
    zonajuego.moveTo(centroXCirculo-12, centroYCirculo+7);
    zonajuego.lineTo(centroXCirculo, centroYCirculo+7);
    zonajuego.strokeStyle = "#000000";
    zonajuego.stroke();
    zonajuego.closePath();

    /* Dibujo ojo izquierdo */
    zonajuego.lineWidth = 3;
    zonajuego.fillStyle = "#FF0000";
    zonajuego.beginPath();
    zonajuego.arc(centroXCirculo-radioCabeza/3, centroYCirculo-radioCabeza/3, 8, 0, 2 * Math.PI, false);
    zonajuego.fill();
    zonajuego.strokeStyle = "#000000";
    zonajuego.stroke();
    zonajuego.closePath();

    /* Dibujo ojo derecho */
    zonajuego.lineWidth = 3;
    zonajuego.fillStyle = "#FF000";
    zonajuego.beginPath();
    zonajuego.arc(centroXCirculo+radioCabeza/3, centroYCirculo-radioCabeza/3, 8, 0, 2 * Math.PI, false);
    zonajuego.fill();
    zonajuego.strokeStyle = "#000000";
    zonajuego.stroke();
    zonajuego.closePath();
  
    /* Dibujo de la boca */
    zonajuego.lineWidth = 5;
    zonajuego.beginPath();
    zonajuego.moveTo(centroXCirculo-20, centroYCirculo+30);
    zonajuego.lineTo(centroXCirculo+20, centroYCirculo+30);
    zonajuego.strokeStyle = "#000000";
    zonajuego.stroke();
    zonajuego.closePath();
  
  }

  function dibujarCabezaCasiSinAire(color, X, Y) {

    let radioCabeza = 50;
    let centroXCirculo = X ;
    let centroYCirculo = Y + radioCabeza;

    /* Dibujo de la cabeza */

    zonajuego.fillStyle = color;
    zonajuego.lineWidth = 7;
    zonajuego.beginPath();
    zonajuego.arc(centroXCirculo, centroYCirculo, radioCabeza, 0, 2 * Math.PI, false);
    zonajuego.fillStyle = color;
    zonajuego.fill();
    zonajuego.strokeStyle = "#000000";
    zonajuego.stroke();
    zonajuego.closePath();

     /* Dibujo de la nariz */
    zonajuego.moveTo(centroXCirculo, centroYCirculo-5);
    zonajuego.lineTo(centroXCirculo-12, centroYCirculo+7);
    zonajuego.moveTo(centroXCirculo-12, centroYCirculo+7);
    zonajuego.lineTo(centroXCirculo, centroYCirculo+7);
    zonajuego.strokeStyle = "#000000";
    zonajuego.stroke();
    zonajuego.closePath();

    /* Dibujo de la boca */
    zonajuego.lineWidth = 5;
    zonajuego.beginPath();
    zonajuego.moveTo(centroXCirculo-30, centroYCirculo+30);
    zonajuego.lineTo(centroXCirculo-20, centroYCirculo+20);
    zonajuego.moveTo(centroXCirculo-20, centroYCirculo+20);
    zonajuego.lineTo(centroXCirculo-10, centroYCirculo+30);
    zonajuego.moveTo(centroXCirculo-10, centroYCirculo+30);
    zonajuego.lineTo(centroXCirculo, centroYCirculo+20);
    zonajuego.moveTo(centroXCirculo, centroYCirculo+20);
    zonajuego.lineTo(centroXCirculo+10, centroYCirculo+30);
    zonajuego.moveTo(centroXCirculo+20, centroYCirculo+20);

    /* Dibujo ojo izquierdo */
    zonajuego.strokeStyle = "#000000";
    zonajuego.stroke();
    zonajuego.closePath();
    zonajuego.lineWidth = 3;
    zonajuego.fillStyle = "#FF0000";
    zonajuego.save();
    zonajuego.scale(1,0.5);
    zonajuego.beginPath();
    zonajuego.arc(centroXCirculo-20, centroYCirculo+190, 12, 0, 2 * Math.PI);
    zonajuego.fill();
    zonajuego.strokeStyle = "#000000";
    zonajuego.stroke();
    zonajuego.closePath();
    zonajuego.restore();

    /* Dibujo ojo derecho */
    zonajuego.lineWidth = 3;
    zonajuego.fillStyle = "#FF0000";
    zonajuego.save();
    zonajuego.scale(1,0.5);
    zonajuego.beginPath();
    zonajuego.arc(centroXCirculo+20, centroYCirculo+190, 12, 0, 2 * Math.PI);
    zonajuego.fill();
    zonajuego.strokeStyle = "#000000";
    zonajuego.stroke();
    zonajuego.closePath();
    zonajuego.restore();

}

/* funcion que dibujas las letras encontradas y fallidas */  
function dibujarZonaLetras(palabraSecreta) {

    
    let palabraElegida = palabraSecreta;
    let cantidadLineas = palabraElegida.length;
    let catidaddeEspaciosEntreLineas = cantidadLineas - 1;
    
    /* Calculo que determina el espacio a ocupar entre letras encontradas */
    espacioOcuparLetrasCorrectas = cantidadLineas * largoLineaLetrasCorrectas + catidaddeEspaciosEntreLineas * largoEspacioLineasLetrasCorrectas;

    /* Caluclo que determina la posición en donde comienzan las lineas de las letras encontradas */
    poscionInicialLetrasCorrectas = Math.floor((anchoCanvas -  espacioOcuparLetrasCorrectas)/2);

    /* Dibujo de los guiones asociados a la palabra a descubrir */
    zonajuego.beginPath(); 
    zonajuego.lineWidth = 6;
    zonajuego.lineCap = "round";
    zonajuego.lineJoin = "round";
    zonajuego.strokeStyle = zonaLetrasCorrectasColor;

    /* Calculo que dibuja los guiones de las letras a encontrar*/
    poscionInicial = poscionInicialLetrasCorrectas;
    
    for (let i = 0; i < cantidadLineas; i++){
        
        zonajuego.moveTo(poscionInicial, posicionVerticalLineasLetrasCorrectas);
        zonajuego.lineTo(poscionInicial + largoLineaLetrasCorrectas, posicionVerticalLineasLetrasCorrectas);

        poscionInicial = poscionInicial + largoLineaLetrasCorrectas + largoEspacioLineasLetrasCorrectas;
        
    }

    zonajuego.stroke();
    zonajuego.closePath();

}

/* Funcion que dibujas las letras encontradas y las erroneas */
function dibujarLetras(letraSecreta) {

    let poscionInicial = poscionInicialLetrasCorrectas;
    
    zonajuego.fillStyle = zonaLetrasCorrectasColor;
    zonajuego.font = tamanoLetrasCorrectas;
    
    let existeLetraEncontrada = false;

    if ( ! letrasCorrectas.includes(letraSecreta.toUpperCase())) {

        for (let i = 0; i < palabraSeleccionada.length; i++) {

            if ( palabraSeleccionada[i].toUpperCase() == letraSecreta.toUpperCase()) {
            
                if (letraSecreta.toUpperCase() == "I") {
                    zonajuego.fillText(letraSecreta.toUpperCase(), poscionInicial + 18, posicionVerticalLineasLetrasCorrectas-10);
                } else {
                   
                    zonajuego.fillText(letraSecreta.toUpperCase(), poscionInicial, posicionVerticalLineasLetrasCorrectas-10);
                }

                existeLetraEncontrada = true;
                letrasEncontradas++;
                letrasCorrectas.push(letraSecreta.toUpperCase());

            }
        
            poscionInicial = poscionInicial + largoLineaLetrasCorrectas + largoEspacioLineasLetrasCorrectas;
        }     

    } else {
        existeLetraEncontrada = true;
    }

    if (! existeLetraEncontrada ) {

        zonajuego.fillStyle = letrasIncorrectasColor;
        zonajuego.font = tamanoLetrasIncorrectas;

        if ( ! letrasMalas.includes(letraSecreta.toUpperCase())) {

           

            if (letraSecreta.toUpperCase() == "I") {
                posicionHorizonal = posicionHorizontalLetrasIncorrectas + 10;
                zonajuego.fillText(letraSecreta.toUpperCase(),posicionHorizonal, posicionVerticalLetrasIncorrectas);
                
            } else {
                zonajuego.fillText(letraSecreta.toUpperCase(),posicionHorizontalLetrasIncorrectas, posicionVerticalLetrasIncorrectas);
                
            }
            
            letrasMalas.push(letraSecreta.toUpperCase());
            posicionHorizontalLetrasIncorrectas = posicionHorizontalLetrasIncorrectas + largoEspacioLineasLetrasInorrectas;
            letrasErradas++;
            DibujarAhorcado(letrasErradas);

        }
        
    }
    
    VerificarJuego();
}

/* Funcion que dibuja cada parte de la horca y el ahorcado de acuerdo a las letras incorrectas */
function DibujarAhorcado(elementoHorca) {

    /* Selecciona el intento fallido y dibuja el avance del ahorcado */
    switch (elementoHorca) {
		case 1: /* Dibuja el mastil de la horca */
                dibujarLineasHorca(25,horcaColor, horcaMastilPosicionHorizontal, 0, horcaBasePosicionVertical, -horcaMastilVerticalLargo);
        break;
        case 2: /* Dibuja el mastil horizontal de la horca */
                dibujarLineasHorca(25,horcaColor, horcaMastilPosicionHorizontal, horcaMastilHorizontalLargo, horcaBasePosicionVertical-horcaMastilVerticalLargo,0);
        break;
        case 3: /* Dibuja la cuerda de la horca */
                dibujarLineasHorca(25,horcaColor, horcaMastilPosicionHorizontal + horcaMastilHorizontalLargo, 0 ,horcaBasePosicionVertical-horcaMastilVerticalLargo, horcaCuerdalargo);
        break
        case 4: /* Dibuja la cabeza del ahorcado */
                dibujarCabezaSano(AhorcadoSanoColor, horcaMastilPosicionHorizontal + horcaMastilHorizontalLargo, horcaBasePosicionVertical-horcaMastilVerticalLargo+ horcaCuerdalargo);
        break
        case 5: /* Dibuja el cuerpo del ahorcado */
            dibujarLineasHorca(15,cuerpoColor, horcaMastilPosicionHorizontal + horcaMastilHorizontalLargo , 0 , horcaBasePosicionVertical-horcaMastilVerticalLargo+ horcaCuerdalargo+105, 130);
        break
        case 6: /* Dibuja la cabeza del ahorcado con menos aire*/
            dibujarCabezaSinAire(AhorcadoSinAireColor, horcaMastilPosicionHorizontal + horcaMastilHorizontalLargo, horcaBasePosicionVertical-horcaMastilVerticalLargo+ horcaCuerdalargo);
            /* Dibuja la pierna izquierda del ahorcado*/
            dibujarLineasHorca(15,cuerpoColor, 725 , -55 , 420, 80);
              /* Dibuja la pierna derecha del ahorcado */
            dibujarLineasHorca(15,cuerpoColor, 725 ,  55 , 420, 80);
        break;
        case 7: /* Dibuja la cabeza del ahorcado casi sin aire */
            dibujarCabezaCasiSinAire(AhorcadoSinAireColor, horcaMastilPosicionHorizontal + horcaMastilHorizontalLargo, horcaBasePosicionVertical-horcaMastilVerticalLargo+ horcaCuerdalargo);
            /* Dibuja el brazo izquierdo del ahorcado */
            dibujarLineasHorca(15,cuerpoColor, 725 , -55 , 340, 50);
            /* Dibuja el brazo derecho del ahorcado */
            dibujarLineasHorca(15,cuerpoColor, 725 ,  55 , 340, 50);
        break
        case 8: /* Dibuja la cabeza del ahorcado sin vida */
            dibujarCabezaAhorcado(AhorcadoColor,  horcaMastilPosicionHorizontal + horcaMastilHorizontalLargo, horcaBasePosicionVertical-horcaMastilVerticalLargo+ horcaCuerdalargo);
            /* Dibuja las manos del ahorcado */
            dibujarLineasHorca(15,cuerpoColor, 670 , -15 , 390, 0);
            dibujarLineasHorca(15,cuerpoColor, 780 , 15 , 390, 0);
            /* Dibujar los zapatos del ahorcado */
            dibujarLineasHorca(15,cuerpoColor, 670 , -15 , 505, 0);
            dibujarLineasHorca(15,cuerpoColor, 780 , 15 , 505, 0);
        break
    }
}


/*******************************************
 * Funciones que inician el juego
 *********************************************/

/* Funcion que arranca el juego desde el boton Nuevo Juego */
function Jugar() {
    
    /* Resetear valores de control del juego */
    finjuego = false;
    letrasEncontradas = 0;
    letrasErradas = 0;
    letrasMalas = [];
    letrasCorrectas = [];
    palabraSeleccionada = "";
    posicionHorizontalLetrasIncorrectas = 375;

    /* Funciones que dibujan las imagenes basicas: La base de la horca y los guiones de las letras a encontrar */
    dibujarZonaAhorcado();
    dibujarLineasHorca(25,horcaColor, horcaBasePosicionHorizontal , horcaBaseLargo , horcaBasePosicionVertical, 0);
    dibujarZonaLetras(elegirPalabra());

}

/* Funcion que inicia el juego desde el boton Iniciar Juego */
function IniciarJuego() {

    /* Oculta sectores de la pagina y muestra el sector del juego */
    document.getElementById("sector-index").style.display = "none";
    document.getElementById("sector-agregar-palabra").style.display = "none";
    document.getElementById("sector-jugar").style.display = "flex";

    Jugar();

}

/* Funcion que oculta sectores y muestra el sector de agregar palabra */
function AgregarPalabra() {

    /* Se muetsra solo los objetos del sector jugar */
    document.getElementById("sector-index").style.display = "none";
    document.getElementById("sector-jugar").style.display = "none";
    document.getElementById("sector-agregar-palabra").style.display = "flex";
} 

/* Funcion que registra la nueva palabra agregada e inicia el juego */
function Guardar() {

    /* Recuperar palabra ingresada */
    palabra = document.getElementById("ingreso-texto").value;

    /* Se valida si la palabra es correcta */
    if (! expresion.letrasValidas.test(palabra.toUpperCase())) {
        alert("La palabra ingresa solo puede tener letras");
        return;
    }

    /* Se agrega la palabra al listado de palabra secretas */
    palabrasSecretas.push(palabra.toUpperCase());

    document.getElementById("sector-index").style.display = "none";
    document.getElementById("sector-agregar-palabra").style.display = "none";
    document.getElementById("sector-jugar").style.display = "flex";
   
    Jugar();

} 

/* Funcion que determina que letra se ha tocado (al soltarla) */
document.addEventListener('keyup', (event) => {

    var keyValue = event.key;

    /* Se modifica la letra selecciona a Mayuscula */
    var keySimbolo = keyValue.toUpperCase();
    

    /* Se valida que la letra seleccionada corresponde entre A y Z */
    if (keyValue.length !== 1 || keySimbolo < "A" || keySimbolo > "Z") {
        return;
    }

    /* Se valida si es el fin del juego. Sino se dibuja la letra seleccionada */
    if ( !finjuego) {
        dibujarLetras(keyValue);
    }

   
}, false);
    

