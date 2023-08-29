document.addEventListener("DOMContentLoaded", () => {
  let conversionesGuardadas =
    JSON.parse(localStorage.getItem("conversiones")) || [];

  const medidaJSON = [
    {
      prefijo: "tera",
      simbolo: "T",
      factorMulti: 1000000000000,
    },
    {
      prefijo: "giga",
      simbolo: "G",
      factorMulti: 1000000000,
    },
    {
      prefijo: "mega",
      simbolo: "M",
      factorMulti: 1000000,
    },
    {
      prefijo: "kilo",
      simbolo: "K",
      factorMulti: 1000,
    },
    {
      prefijo: "deci",
      simbolo: "D",
      factorMulti: 0.1,
    },
    {
      prefijo: "centi",
      simbolo: "C",
      factorMulti: 0.01,
    },
    {
      prefijo: "mili",
      simbolo: "MI",
      factorMulti: 0.001,
    },
    {
      prefijo: "micro",
      simbolo: "MIC",
      factorMulti: 0.000001,
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
      resultadoDiv.textContent = `${cantidad} ${deMedida} es equivalente a ${convertedAmount} ${aNewmedida}`;
    } else {
      resultadoDiv.textContent = "ERROR! Ingrese un valor válido.";
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
