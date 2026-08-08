# Serena Pastelería Artesanal

Sitio web para **Serena**, pastelería artesanal en Rionegro (Antioquia) especializada en tortas personalizadas: cumpleaños, 15 años, grados, sacramentos, temáticas, impresión comestible, cupcakes, alfajores, galletas, mini donas y desayunos sorpresa.

## Demo

Sirve la carpeta con cualquier servidor estático (ver [Ejecutar en local](#ejecutar-en-local)) y abre `index.html`. No abras los archivos directamente con doble clic (`file://`): el catálogo dinámico necesita `http://` para funcionar.

## Características

- Landing principal con slider de imágenes, especialidades, productos, testimonios y sección "por qué elegirnos".
- 12 páginas de catálogo (6 especialidades + 6 productos) con galería de diseños, precio y cotización directa por WhatsApp.
- **Catálogo editable sin tocar código**: cada página de catálogo lee su contenido desde `data/*.json` en tiempo real. Ver [Panel de administración](#panel-de-administración).
- **Carrito sin backend**: se puede agregar cualquier diseño al carrito desde cualquier página (persiste en `localStorage`), y al finalizar arma un solo mensaje de WhatsApp con el listado completo y el total.
- Página de personalización (`diseno.html`): el cliente elige personas, sabor, relleno, color, mensaje y puede adjuntar una imagen de referencia; genera un resumen y arma automáticamente el mensaje de WhatsApp.
- Menú móvil funcional (hamburguesa animada, panel deslizable).
- Botón flotante de WhatsApp con mensaje contextual por página.
- Slider de hero con autoplay, controles, indicadores y gestos táctiles.
- Diseño responsive (header, grillas, formularios y footer se adaptan en tablet/móvil).

## Stack

Sitio estático (sin build step) más un panel de administración externo:

- **HTML5** semántico
- **CSS3** modular (variables, reset, tipografías, componentes, layout, páginas, responsive)
- **JavaScript** vanilla (ES6+), sin frameworks ni dependencias de build
- **JSON** como fuente de datos del catálogo (`data/*.json`), consumido con `fetch`
- **[Decap CMS](https://decapcms.org/)** (antes Netlify CMS) como panel de administración — edita los JSON de arriba a través de una interfaz web y los sube directo al repositorio de GitHub
- [Font Awesome](https://fontawesome.com/) vía CDN para iconografía

## Estructura del proyecto

```
SERENA/
├── index.html                     # Landing principal
├── diseno.html                    # Personalizador de tortas
├── 15-anios.html, cumpleaños.html, grados.html,
│   sacramentos.html, tematicas.html, comestible.html      # Especialidades
├── tortas-serena.html, cupcakes.html, alfajores.html,
│   galletas.html, donas.html, desayunos.html               # Productos
├── admin/
│   ├── index.html                 # Carga Decap CMS
│   └── config.yml                 # Colecciones del panel (una por categoría)
├── data/
│   └── *.json                     # Catálogo: hero + diseños de cada categoría (12 archivos)
├── css/
│   ├── base/                      # Variables, reset, tipografías, estilos globales
│   ├── components/                # Botones, tarjetas, carrito, slider, whatsapp
│   ├── layout/                    # Header y footer
│   ├── pages/                     # Estilos específicos de la landing
│   ├── tortas/                    # Estilos de páginas de categoría/diseño
│   ├── animations.css
│   └── responsive.css             # Debe cargarse último en cada página (ver nota abajo)
├── js/
│   ├── catalogo.js                # Fetch de data/*.json y render del hero + galería
│   ├── carrito.js                 # Carrito en localStorage y envío a WhatsApp
│   ├── menu.js                    # Menú móvil
│   ├── diseno.js                  # Lógica del personalizador
│   ├── slider.js                  # Slider de imágenes del hero
│   ├── testimonios.js             # Carrusel de testimonios
│   └── whatsapp.js                # Burbuja/mensaje flotante de WhatsApp
└── recursos/
    ├── imagenes/                  # Fotografías de producto
    ├── iconos/
    ├── fuentes/
    └── logos/
```

> **Nota sobre CSS:** `responsive.css` tiene que ser el último `<link>` de cada página. Si otra hoja de estilos se agrega después, sus reglas le ganan la cascada a las de responsive y el sitio deja de adaptarse en móvil.

## Ejecutar en local

El catálogo usa `fetch` para leer los JSON, así que **necesitas un servidor**, no sirve abrir el HTML directamente:

```bash
# con Python
python3 -m http.server 5500

# o con Node (http-server)
npx http-server -p 5500
```

Luego abre `http://localhost:5500`.

## Panel de administración

El catálogo (nombre, etiquetas, precio y foto de cada diseño, más el texto del encabezado de cada categoría) vive en `data/*.json`. En vez de editar esos archivos a mano, hay un panel web en `/admin` para hacerlo con formularios.

Este panel no tiene servidor propio: usa **Git Gateway**, un servicio de Netlify que permite iniciar sesión y guardar cambios directo en este repositorio de GitHub, sin que tengas que dar tu contraseña de GitHub ni yo tenga que programar un backend. Por eso el sitio debe alojarse en **Netlify** (no en GitHub Pages) para que el panel funcione.

### Activarlo (una sola vez, lo haces tú desde tu cuenta)

1. En [netlify.com](https://netlify.com), conecta este repositorio de GitHub como un nuevo sitio ("Add new site" → "Import an existing project"). Netlify detecta que es un sitio estático, no necesita configuración de build.
2. En el panel del sitio: **Site configuration → Identity → Enable Identity**.
3. En **Identity → Registration**, cambia a **"Invite only"** (para que nadie más se registre por su cuenta).
4. En **Identity → Services → Git Gateway**, dale a **Enable Git Gateway**.
5. En la pestaña **Identity**, usa **Invite users** y escribe tu correo. Te llega un correo para poner tu contraseña.
6. Ya con tu cuenta activa, entra a `https://tu-sitio.netlify.app/admin/`, inicia sesión, y ahí puedes editar diseños, precios y fotos de las 12 categorías.

Cada cambio que guardes en el panel crea un commit en este repositorio (en `data/*.json`) y Netlify vuelve a publicar el sitio automáticamente en un par de minutos.

## Carrito (sin pagos en línea)

Cada tarjeta de diseño tiene un botón para agregarla al carrito. El carrito:

- Se guarda en el navegador del cliente (`localStorage`), no en un servidor.
- Se puede ir armando desde varias páginas distintas.
- Al abrir el panel (ícono del carrito en el header) se puede quitar ítems o vaciarlo.
- El botón final arma un solo mensaje de WhatsApp con el listado completo y el total aproximado — no hay checkout ni cobro en línea, la confirmación de precio y pago se hace por WhatsApp con la pastelería.

## Paleta y tipografía

Definidas como variables CSS en `css/base/variables.css`:

| Uso | Valor |
|---|---|
| Color principal | `#00B3B7` |
| Color secundario | `#FFBF94` |
| Color acento | `#ff846c` |
| Superficie | `#FFF8F5` |
| Tipografía de títulos | Soligant |
| Tipografía de texto | FS Lucas Pro |

## Contacto integrado

Todos los flujos de cotización (galerías de diseño, carrito, formulario de personalización, botón flotante) dirigen a WhatsApp con un mensaje pre-armado según el contexto.

## Autor

Diseñado y desarrollado por [VERTRISS](https://www.instagram.com/vertriss.co/).
