function generarColorHex() {
    const caracteres = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i++) {
        const posicion = Math.floor(Math.random() * caracteres.length);
        color += caracteres[posicion];
    }

    return color;
}

function elegirTextoHex(color) {
    const r = parseInt(color.substring(1, 3), 16);
    const g = parseInt(color.substring(3, 5), 16);
    const b = parseInt(color.substring(5, 7), 16);

    const luminosidad = (r + g + b) / 3;

    if (luminosidad > 160) {
        return "#222";
    } else {
        return "white";
    }
}


function generarColorHsl() {
    const h = Math.floor(Math.random() * 361);
    const s = Math.floor(Math.random() * 51) + 50;
    const l = Math.floor(Math.random() * 41) + 30;

    return {
        color: `hsl(${h}, ${s}%, ${l}%)`,
        luminosidad: l
    };
}

function elegirTexto(luminosidad) {
    if (luminosidad > 60) {
        return "#222";
    } else {
        return "white";
    }
}

const cantidad = document.getElementById("cantidad");
const formato = document.getElementById("formato");
const botonGenerar = document.getElementById("generar");
const paleta = document.getElementById("paleta");
const mensaje = document.getElementById("mensaje");

botonGenerar.addEventListener("click", function() {
    paleta.innerHTML = "";
    mensaje.textContent = "¡Paleta generada correctamente!";

    const cantidadColores = Number(cantidad.value);

    for (let i = 0; i < cantidadColores; i++) {
        let color;
        let colorTexto;

        if (formato.value === "hex") {
         color = generarColorHex();
         colorTexto = elegirTextoHex(color);
        } else {
            const resultadoHsl = generarColorHsl();
            color = resultadoHsl.color;
            colorTexto = elegirTexto(resultadoHsl.luminosidad);
        }

        const tarjeta = document.createElement("div");

tarjeta.textContent = color;

tarjeta.style.setProperty("--color", color);
tarjeta.style.color = colorTexto;

tarjeta.classList.add("tarjeta-color");

const botonCopiar = document.createElement("button");

botonCopiar.textContent = "Copiar";

botonCopiar.addEventListener("click", function() {
    navigator.clipboard.writeText(color);
    mensaje.textContent = `¡${color} copiado!`;
});

tarjeta.appendChild(botonCopiar);

paleta.appendChild(tarjeta);
    }
});