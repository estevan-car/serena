# Serena Pastelería Artesanal

Sitio web para **Serena**, pastelería artesanal en Rionegro (Antioquia) especializada en tortas personalizadas: cumpleaños, 15 años, grados, sacramentos, temáticas e impresión comestible.

## Demo

Abre `index.html` en tu navegador o sirve la carpeta con cualquier servidor estático (ver [Ejecutar en local](#ejecutar-en-local)).

## Características

- Landing principal con slider de imágenes, catálogo de especialidades, productos, testimonios y sección "por qué elegirnos".
- Páginas de categoría (15 años, cumpleaños, grados, sacramentos, temáticas, impresión comestible) con galería de diseños y cotización directa por WhatsApp.
- Página de personalización (`diseno.html`): el cliente elige personas, sabor, relleno, color, mensaje y puede subir una imagen de referencia; genera un resumen y arma automáticamente el mensaje de WhatsApp.
- Botón flotante de WhatsApp con mensaje contextual por página.
- Slider de hero con autoplay, controles, indicadores y soporte de gestos táctiles.
- Diseño responsive.

## Stack

Sitio 100% estático, sin frameworks ni build step:

- **HTML5** semántico
- **CSS3** modular (variables, reset, tipografías, componentes, layout, páginas, responsive)
- **JavaScript** vanilla (ES6+), sin dependencias externas
- [Font Awesome](https://fontawesome.com/) vía CDN para iconografía

## Estructura del proyecto

```
SERENA/
├── index.html              # Landing principal
├── diseno.html              # Personalizador de tortas
├── 15-anios.html             # Categoría: 15 años
├── cumpleaños.html           # Categoría: cumpleaños
├── grados.html                # Categoría: grados
├── sacramentos.html          # Categoría: sacramentos
├── tematicas.html             # Categoría: temáticas
├── comestible.html           # Categoría: impresión comestible
├── css/
│   ├── base/                  # Variables, reset, tipografías, estilos globales
│   ├── components/            # Botones, tarjetas, carrito, slider, whatsapp
│   ├── layout/                 # Header y footer
│   ├── pages/                  # Estilos específicos por sección de la landing
│   ├── tortas/                 # Estilos de páginas de categoría/diseño
│   ├── animations.css
│   └── responsive.css
├── js/
│   ├── diseno.js               # Lógica del personalizador y envío a WhatsApp
│   ├── slider.js                # Slider de imágenes del hero
│   ├── testimonios.js           # Carrusel de testimonios
│   └── whatsapp.js              # Burbuja/mensaje flotante de WhatsApp
└── recursos/
    ├── imagenes/                # Fotografías de producto
    ├── iconos/
    ├── fuentes/
    └── logos/
```

## Ejecutar en local

No requiere instalación. Basta con servir la carpeta como sitio estático:

```bash
# con Python
python3 -m http.server 5500

# o con Node (http-server)
npx http-server -p 5500
```

Luego abre `http://localhost:5500`.

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

Todos los flujos de cotización (galerías de diseño, formulario de personalización, botón flotante) dirigen a WhatsApp con un mensaje pre-armado según el contexto (diseño elegido, detalles del pedido, etc.).

## Autor

Diseñado y desarrollado por [VERTRISS](https://www.instagram.com/vertriss.co/).
