document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});


function iniciarApp (){
    crearGaleria();
    scrollSmooth();
    barraNavegacionFija ();
}
//Funcion que crea una galeria recorriendo el directorio indicado, crea las galerias en distintas versiones adaptadas a los distintos navegadores.
function crearGaleria(){
    const galeria = document.querySelector('.galeria-imagenes');
    for (let index = 1; index <= 12; index++) {
        const imagen = document.createElement('picture');
        imagen.innerHTML = `
            <source srcset="build/img/thumb/${index}.avif" type="image/avif">
            <source srcset="build/img/thumb/${index}.webp" type="image/webp">            
            <img loading="lazy" src = "build/img/thumb/${index}.jpg"alt ="${index}">`;
        galeria.appendChild(imagen); 
        imagen.onclick = function () {
            mostrarImagen(index);
        }      
    }    
}

function mostrarImagen(idImagen){
    const body = document.querySelector('body');
    const imagen = document.createElement('picture');

        imagen.innerHTML = `
            <source srcset="build/img/grande/${idImagen}.avif" type="image/avif">
            <source srcset="build/img/grande/${idImagen}.webp" type="image/webp">            
            <img loading="lazy" src = "build/img/grande/${idImagen}.jpg"alt ="${idImagen}">`;
            //Crear el overlay con la imagen
            const overlay = document.createElement('DIV');
            overlay.appendChild(imagen);
            overlay.classList.add('overlay');

            //Cerrar presionando en la imagen 
            overlay.onclick = function (){
                body.classList.remove('fijar-body');
                overlay.remove();
            }
            //Boton para cerrar el modal 
            //Creaos un nuevo elemento como parrafo 
            const cerrarModal = document.createElement('P');
            //Añadimos el contenido
            cerrarModal.textContent = 'X';
            //Añadimos la clase para poder trabajar desde css
            cerrarModal.classList.add('btn-cerrar');
            //Registramos el evento on click en la X , y cuando hacemos clik en el eliminamos el overlay . 
            cerrarModal.onclick = function (){
                               
                body.classList.remove('fijar-body');
                overlay.remove();
            }
            overlay.appendChild(cerrarModal);
            //Añadirlo al html 
            
            body.appendChild(overlay);
            body.classList.add('fijar-body');
}

function scrollSmooth (){
    //Buscamos los enlaces y lo almacenamos en una variable
    const enlaces = document.querySelectorAll('.navegacion-principal a');
    //Recorremos esa variable media un for eatch. y le añadimos el eventListener a todos ellos. 
    enlaces.forEach(enlace => {
        enlace.addEventListener('click', function(element){
            //Anulamos el comportamiento por defecto 
            element.preventDefault();
            //Creamos una variable para almacenar el href del elemento seleccionado. 
            const seccionScroll = element.target.attributes.href.value;
            
            const seccion = document.querySelector(seccionScroll);

            seccion.scrollIntoView({ behavior :"smooth" });
        });
    });
}

function barraNavegacionFija (){
    //Variable para identificar la barra de navegacion
    const barraNavegacion = document.querySelector('.header');
    //Variable para identicar donde desaparece la barra de navegacion superior.
    const sobreFestival = document.querySelector('.sobre-festival');

    const body = document.querySelector('body');

    window.addEventListener('scroll', function(){
        

        if(sobreFestival.getBoundingClientRect().bottom<0){
            barraNavegacion.classList.add('fijo');
            body.classList.add('body-scroll');
        }else{
            barraNavegacion.classList.remove('fijo');
            body.classList.remove('body-scroll');
        }
    })
}