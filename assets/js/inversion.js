function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

function formatDate(date) {
  return [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
  ].join("/");
}

Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

$("#submit").on("click", function (e) {
  e.preventDefault();
  let meses = 12;
  var monto = $("#monto").val();
  monto = parseFloat(monto);
  var cuenta = $("#cuenta").val();
  var valor = $("#resultado").val();
  valor = parseFloat(valor);
  var usd = (monto / valor).toFixed(2);
  var porcentaje = 0.06;
  var acumulado = usd;
  acumulado = parseFloat(acumulado);
  var interes = acumulado * 0.06;
  interes = parseFloat(interes);

  var formatterUSD = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  var formatterMXN = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  });

  var fechaActual = $("#fechaActual").val();

  if (cuenta==1){
      $("#tablaHead").append(`
            <tr>
            <th scope="col">Serie</th>
            <th scope="col">Fecha</th>
            <th scope="col">Capital (USD)</th>
            <th scope="col">Interés (USD)</th>
        </tr>
                    `);
  }else if(cuenta==2){

      $("#tablaHead").append(`
            <tr>
            <th scope="col">Serie</th>
            <th scope="col">Fecha</th>
            <th scope="col">Capital (USD)</th>
            <th scope="col">Interés</th>
            <th scope="col">Rendimiento</th>
        </tr>
                    `);
  }


  for (var i = 0; i < meses; i++) {
    fechaActual = new Date(fechaActual);
    fechaActual = fechaActual.setMonth(fechaActual.getMonth() + 1);
    fechaActual = new Date(fechaActual);
    fechaActual = fechaActual.addDays(1);
    fechaActual = formatDate(fechaActual);

    var fechaInput = fechaActual.split("-").reverse().join("/");

    if (cuenta == 1) {

        

      $("#tablaBody2").append(` 
        <tr>
            <th scope="row">${i + 1}</th>
            <td>${fechaInput}</td>
            <td>${formatterUSD.format(usd)}</td>
            <td>${formatterUSD.format(usd * 0.05)}</td>
            
        </tr>
        `);
    } else if (cuenta == 2) {
        interes = acumulado * 0.06;
        monto = monto + monto * 0.06;
        usd = monto / valor;
        acumulado += interes;
       

      $("#tablaBody2").append(` 
    <tr>
        <th scope="row">${i + 1}</th>
        <td>${fechaInput}</td>
        <td>${formatterUSD.format(usd)}</td>
        <td>${formatterUSD.format(interes)}</td>
        <td>${formatterUSD.format(acumulado + interes)}</td>
                
    </tr>
    `);


      console.log(monto, interes, acumulado, usd);
    }
    fechaActual = fechaActual.split("/").reverse().join("-");
  }
});
