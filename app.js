const cartas = [
    {src: "img/aguila.png"},
    {src: "img/aguila.png"},
    {src: "img/caballo.png"},
    {src: "img/caballo.png"},
    {src: "img/ciervo.png"},
    {src: "img/ciervo.png"},
    {src: "img/coala.png"},
    {src: "img/coala.png"},
    {src: "img/elefante.png"},
    {src: "img/elefante.png"},
    {src: "img/leon.png"},
    {src: "img/leon.png"},
    {src: "img/tigre.png"},
    {src: "img/tigre.png"},
    {src: "img/tortuga.png"},
    {src: "img/tortuga.png"},
]
const cartasAleatorias = cartas.sort(() => (Math.random() > 0.5) ? 2 : -1);

const imagen = document.querySelectorAll('.contenedor-carta img');

imagen.forEach((img, index) => {
    img.src = cartasAleatorias[index].src;
});

let cartasAbiertas = [];
let bloqueo = false;

function mostrarCarta(event) {
    if (bloqueo) {
        return;
    } 
        
    const contenedorCartas = event.currentTarget;
    const cartaVolteada = contenedorCartas.classList.contains('mostrar');

    if (!cartaVolteada) {
        if (cartasAbiertas.length < 2) {
            contenedorCartas.classList.add('mostrar');

            cartasAbiertas.push(contenedorCartas);

            if (cartasAbiertas.length === 2) {
                bloqueo = true;

                const primeraCarta = cartasAbiertas[0].querySelector('.imagen-carta').src;
                const segundaCarta = cartasAbiertas[1].querySelector('.imagen-carta').src;

                if (primeraCarta !== segundaCarta) {
                    setTimeout(() => {
                        cartasAbiertas.forEach(carta => {
                            carta.classList.remove('mostrar');
                            cartasAbiertas = [];
                            bloqueo = false;
                        })
                    }, 1000);
                } else {
                    cartasAbiertas.forEach(carta => carta.classList.add('iguales'));
                    cartasAbiertas = [];
                    bloqueo = false;
    
                    const todasIguales = Array.from(imagen).every(img => img.parentElement.classList.contains('iguales'));
    
                    if (todasIguales) {
                        setTimeout(() => {
                            reiniciar();
                            
                        }, 1500);
                    }
                }
            }

        }
    }
}

function reiniciar() {
    cartasAbiertas = [];
    bloqueo = false;

    const cartasAleatorias = cartas.sort(() => (Math.random() > 0.5) ? 2 : -1);

    imagen.forEach((img, index) => {
        img.src = cartasAleatorias[index].src;
        img.parentElement.classList.remove('mostrar', 'iguales');
    });
}