// Botón "Cargar más"
let loadMoreBtn = document.querySelector('#load-more');
let currentItem = 8;

loadMoreBtn.onclick = () => {
    let boxes = [...document.querySelectorAll('.box-container .box')];
    for (var i = currentItem; i < currentItem + 4; i++) {
        if (boxes[i]) {
            boxes[i].style.display = 'inline-block';
        }
    }
    currentItem += 4;
    if (currentItem >= boxes.length) {
        loadMoreBtn.style.display = 'none';
    }
}

// ================== CARRITO ==================
const carrito = document.getElementById('carrito');
const elementos1 = document.getElementById('lista-1');
const lista = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
const imgCarrito = document.getElementById('img-carrito');

cargarEventListeners();

function cargarEventListeners() {
    elementos1.addEventListener('click', comprarElemento);
    carrito.addEventListener('click', eliminarElemento);
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
}

function comprarElemento(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const elemento = e.target.closest('.box');
        leerDatosElemento(elemento);
        animarCarrito();
        mostrarMensaje("Tu artículo fue añadido al carrito");
        actualizarTotalCarrito();
    }
}

function leerDatosElemento(elemento) {
    const infoElemento = {
        imagen: elemento.querySelector('img').src,
        titulo: elemento.querySelector('h3').textContent,
        precio: elemento.querySelector('.Precio').textContent,
        id: elemento.querySelector('a.agregar-carrito').getAttribute('data-id')
    }
    insertarCarrito(infoElemento);
}

function insertarCarrito(elemento) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td><img src="${elemento.imagen}" width="100" style="border-radius:10px; object-fit:cover;"></td>
        <td>${elemento.titulo}</td>
        <td>${elemento.precio}</td>
        <td><a href="#" class="borrar" data-id="${elemento.id}">X</a></td>
    `;
    lista.appendChild(row);
}

function eliminarElemento(e) {
    e.preventDefault();
    if (e.target.classList.contains('borrar')) {
        e.target.parentElement.parentElement.remove();
        actualizarTotalCarrito();
    }
}

function vaciarCarrito() {
    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }
    actualizarTotalCarrito();
    return false;
}

function animarCarrito() {
    imgCarrito.classList.add('animado');
    setTimeout(() => {
        imgCarrito.classList.remove('animado');
    }, 500);
}

function mostrarMensaje(texto) {
    const mensaje = document.createElement('div');
    mensaje.textContent = texto;
    mensaje.style.position = 'fixed';
    mensaje.style.top = '20px';
    mensaje.style.right = '20px';
    mensaje.style.backgroundColor = '#1d80b9';
    mensaje.style.color = '#fff';
    mensaje.style.padding = '10px 20px';
    mensaje.style.borderRadius = '5px';
    mensaje.style.boxShadow = '0 5px 10px rgba(0,0,0,0.2)';
    mensaje.style.zIndex = '1000';
    document.body.appendChild(mensaje);
    setTimeout(() => {
        mensaje.remove();
    }, 2000);
}

function actualizarTotalCarrito() {
  const precios = document.querySelectorAll('#lista-carrito tbody tr td:nth-child(3)');
  let totalLempiras = 0;

  precios.forEach(precioTd => {
    const texto = precioTd.textContent
      .replace('L.', '')
      .replace(/\./g, '')   // quita puntos de miles
      .replace(',', '.')    // convierte coma decimal a punto
      .trim();

    const valor = parseFloat(texto);
    if (!isNaN(valor)) {
      totalLempiras += valor;
    }
  });

  const totalUSD = totalLempiras / 27;

  document.getElementById('total-lempiras').textContent =
    `L.${totalLempiras.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  document.getElementById('total-usd').textContent =
    `USD ${totalUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// ================== BOTÓN PAYPAL ==================
document.getElementById("paypal-btn").addEventListener("click", function() {
    window.open(this.href, "_blank");
});
