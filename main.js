document.addEventListener("DOMContentLoaded", () => {
  let conversionesGuardadas =
    JSON.parse(localStorage.getItem("conversiones")) || [];

  const medidaJSON = [
    {
      prefijo: "tera",
      simbolo: "T",
      factorMulti: 1012,
    },
    {
      prefijo: "giga",
      simbolo: "G",
      factorMulti: 109,
    },
    {
      prefijo: "mega",
      simbolo: "M",
      factorMulti: 106,
    },
    {
      prefijo: "kilo",
      simbolo: "k",
      factorMulti: 103,
    },
    {
      prefijo: "deci",
      simbolo: "d",
      factorMulti: 0.1,
    },
    {
      prefijo: "centi",
      simbolo: "c",
      factorMulti: 0.01,
    },
    {
      prefijo: "mili",
      simbolo: "m",
      factorMulti: 0.001,
    },
  ];

  // Elementos del DOM
  const btnConvertir = document.getElementById("btnConvertir");
  const resultadoDiv = document.getElementById("resultado");
  const modoOscuroBtn = document.getElementById("modoOscuroBtn");

  // Función para convertir
  btnConvertir.addEventListener("click", () => {
    const deMedidaSelect = document.getElementById("deMedida");
    const aNewmedidaSelect = document.getElementById("aNewmedida");
    const cantidadInput = document.getElementById("cantidad");

    const deMedida = deMedidaSelect.value.toUpperCase();
    const aNewmedida = aNewmedidaSelect.value.toUpperCase();
    const cantidad = parseFloat(cantidadInput.value);

    const medidaOrigen = medidaJSON.find(
      (medida) => medida.prefijo === deMedida || medida.simbolo === deMedida
    );
    const medidaDestino = medidaJSON.find(
      (medida) => medida.prefijo === aNewmedida || medida.simbolo === aNewmedida
    );
    if (!isNaN(cantidad) && medidaOrigen && medidaDestino) {
      const convertedAmount =
        cantidad * (medidaOrigen.factorMulti / medidaDestino.factorMulti);
      resultadoDiv.textContent = `${cantidad.toFixed(
        2
      )} ${deMedida} es equivalente a ${convertedAmount.toFixed(
        2
      )} ${aNewmedida}`;
    } else {
      resultadoDiv.textContent = "ERROR! Ingrese un valor válido.";
    }
    if (!isNaN(cantidad) && medidaOrigen && medidaDestino) {
      const convertedAmount =
        cantidad * (medidaDestino.factorMulti / medidaOrigen.factorMulti);

      const conversion = {
        deMedida: deMedida,
        aNewmedida: aNewmedida,
        cantidad: cantidad,
        resultado: convertedAmount.toFixed(2),
      };

      conversionesGuardadas.push(conversion);
      localStorage.setItem(
        "conversiones",
        JSON.stringify(conversionesGuardadas)
      );

      resultadoDiv.textContent = `${cantidad.toFixed(
        2
      )} ${deMedida} es equivalente a ${convertedAmount.toFixed(
        2
      )} ${aNewmedida}`;
    }
  });

  //  modo oscuro
  modoOscuroBtn.addEventListener("click", () => {
    document.body.classList.toggle("modo-oscuro-activado");
  });

  // Función para cargar las conversiones desde el localStorage
  function cargarConversionesGuardadas() {
    const conversionesGuardadas =
      JSON.parse(localStorage.getItem("conversiones")) || [];

    conversionesGuardadas.forEach((conversion) => {
      const div = document.createElement("div");
      div.textContent = `${conversion.cantidad} ${conversion.deMedida} es equivalente a ${conversion.resultado} ${conversion.aNewmedida}`;
      resultadoDiv.appendChild(div);
    });
  }

  // Llamar a la función para cargar las conversiones guardadas
  cargarConversionesGuardadas();
});
