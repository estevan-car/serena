/* MENÚ MÓVIL */

const botonMenu = document.querySelector(".boton-menu");
const menuPrincipal = document.querySelector(".menu-principal");

if (botonMenu && menuPrincipal) {

    function cerrarMenu(){

        menuPrincipal.classList.remove("abierto");
        botonMenu.classList.remove("activo");
        botonMenu.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-abierto");

    }

    function alternarMenu(){

        const abierto = menuPrincipal.classList.toggle("abierto");

        botonMenu.classList.toggle("activo", abierto);
        botonMenu.setAttribute("aria-expanded", abierto ? "true" : "false");
        document.body.classList.toggle("menu-abierto", abierto);

    }

    /* ABRIR / CERRAR CON EL BOTÓN */

    botonMenu.addEventListener("click", (e)=>{

        e.stopPropagation();
        alternarMenu();

    });

    /* CERRAR AL HACER CLICK EN UN LINK */

    menuPrincipal.querySelectorAll("a").forEach(link=>{

        link.addEventListener("click", cerrarMenu);

    });

    /* CERRAR AL HACER CLICK FUERA */

    document.addEventListener("click", (e)=>{

        if(!menuPrincipal.contains(e.target) && !botonMenu.contains(e.target)){

            cerrarMenu();

        }

    });

    /* CERRAR CON ESCAPE */

    document.addEventListener("keydown", (e)=>{

        if(e.key === "Escape"){

            cerrarMenu();

        }

    });

    /* CERRAR AL AGRANDAR LA VENTANA */

    window.addEventListener("resize", ()=>{

        if(window.innerWidth > 860){

            cerrarMenu();

        }

    });

}
