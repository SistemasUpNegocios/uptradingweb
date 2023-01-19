$("#contForm").on("keyup change", function (event) {
    $("#tablaBody").empty();
    var meses = 12;

    var target = $(event.target);
    if (target.is("#inversionInput")) {
        if ($("#tipoCambioInput").val()) {
            var peso = $("#inversionInput").val();

            var dolar_peso = $("#tipoCambioInput").val();

            var dolares = peso / dolar_peso;

            $("#inversionUsInput").val(dolares.toFixed(2));
        }
    } else if (target.is("#inversionUsInput")) {
        if ($("#tipoCambioInput").val()) {
            var dolar = $("#inversionUsInput").val();

            var dolar_peso = $("#tipoCambioInput").val();

            var peso = 1 / dolar_peso;

            var pesos = dolar / peso;

            $("#inversionInput").val(pesos.toFixed(2));
        }
    }
    if ($("#fechaInicioInput").val()) {
        var fechaInicio = $("#fechaInicioInput").val();
        fechaInicio = new Date(fechaInicio);
        fechaInicio = fechaInicio.addDays(1);

        var fechaReintegro = new Date(
            fechaInicio.setMonth(fechaInicio.getMonth() + parseInt(meses))
        );

        var fechaRenovacion = fechaReintegro.outDays(15);

        var fechaPago = fechaReintegro.addDays(15);
        fechaPago = formatDate(new Date(fechaPago));
        fechaPago = fechaPago.split("/").reverse().join("-");

        $("#fechaPagInput").val(fechaPago);

        fechaRenovacion = formatDate(new Date(fechaRenovacion));
        fechaRenovacion = fechaRenovacion.split("/").reverse().join("-");

        $("#fechaRenInput").val(fechaRenovacion);
    }
    if ($("#tipoIdInput").val()) {
        getPorcentaje();
    }
    if ($("#tipoIdInput2").val()) {
        getPorcentaje2();
    }
    if (target.is("#porcentajeInversionInput")) {
        setPorcentaje();
    } else if (target.is("#porcentajeInversionInput2")) {
        setPorcentaje2();
    }
    if (
        $("#inversionInput").val() &&
        $("#inversionUsInput").val() &&
        $("#tipoCambioInput").val() &&
        $("#fechaInicioInput").val() &&
        $("#fechaRenInput").val() &&
        $("#fechaPagInput").val() &&
        $("#tipoIdInput").val() &&
        $("#porcentajeInput").val()
    ) {
        if ($("#dividirSwitch").prop("checked") == false) {
            $("#contTabla").empty();

            var tipo_contrato = $("option:selected", "#tipoIdInput").attr(
                "data-tipo"
            );

            if (tipo_contrato == "Rendimiento compuesto") {
                $("#contTabla").append(`
                    <div class="table-responsive">
                        <table class="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">Serie</th>
                                    <th scope="col">Capital (MXN)</th>
                                    <th scope="col">Capital (USD)</th>
                                    <th scope="col">Fecha</th>
                                </tr>
                            </thead>
                            <tbody id="tablaBody">                        
                            </tbody>
                        </table>
                    </div>
                `);
            } else if (tipo_contrato == "Rendimiento mensual") {
                $("#contTabla").append(`
                    <div class="table-responsive">
                        <table class="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">Serie</th>
                                    <th scope="col">Capital (MXN)</th>
                                    <th scope="col">Capital (USD)</th>
                                    <th scope="col">Interés</th>
                                    <th scope="col">Fecha</th>
                                </tr>
                            </thead>
                            <tbody id="tablaBody">                        
                            </tbody>
                        </table>
                    </div>
                `);
            }

            var inversionMXN = $("#inversionInput").val();
            inversionMXN = parseFloat(inversionMXN);

            var inversionUSD = $("#inversionUsInput").val();
            inversionUSD = parseFloat(inversionUSD);

            var porcentaje = $("#porcentajeInput").val();
            porcentaje = parseFloat(porcentaje);

            var fecha = $("#fechaInicioInput").val();
            var porcentaje = $("#porcentajeInput").val();
            var usd = parseFloat($("#tipoCambioInput").val());

            for (var i = 0; i < meses; i++) {
                fecha = new Date(fecha);
                fecha = fecha.setMonth(fecha.getMonth() + 1);
                fecha = new Date(fecha);
                fecha = fecha.addDays(1);
                fecha = formatDate(fecha);

                var fechaInput = fecha.split("/").reverse().join("-");

                var formatterUSD = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                });

                var formatterMXN = new Intl.NumberFormat("es-MX", {
                    style: "currency",
                    currency: "MXN",
                });

                if (tipo_contrato == "Rendimiento compuesto") {
                    var porcentaje2 = `0.0${porcentaje}`;
                    porcentaje2 = parseFloat(porcentaje2);

                    inversionMXN = inversionMXN + inversionMXN * porcentaje2;
                    inversionUSD = inversionMXN / usd;
                    $("#tablaBody").append(` 
                    <tr>
                        <th scope="row">${i + 1}</th>
                        <td>${formatterMXN.format(inversionMXN)}</td>
                        <td>${formatterUSD.format(inversionUSD)}</td>
                        <td>${fecha}</td>
                    </tr>
                    `);
                } else if (tipo_contrato == "Rendimiento mensual") {
                    var porcentaje2 = `0.0${porcentaje}`;
                    porcentaje2 = parseFloat(porcentaje2);
                    $("#tablaBody").append(` 
                    <tr>
                        <th scope="row">${i + 1}</th>
                        <td>${formatterMXN.format(inversionMXN)}</td>
                        <td>${formatterUSD.format(inversionUSD)}</td>
                        <td>${formatterUSD.format(
                            inversionUSD * porcentaje2
                        )}</td>
                        <td>${fecha}</td>
                    </tr>
                    `);
                }

                fecha = fecha.split("/").reverse().join("-");
            }
        } else {
            $("#contTabla").empty();
            if (
                $("#inversionInput").val() &&
                $("#inversionUsInput").val() &&
                $("#tipoCambioInput").val() &&
                $("#fechaInicioInput").val() &&
                $("#fechaRenInput").val() &&
                $("#fechaPagInput").val() &&
                $("#tipoIdInput").val() &&
                $("#porcentajeInput").val() &&
                $("#tipoIdInput2").val() &&
                $("#porcentajeInput2").val() &&
                $("#porcentajeInversionInput").val() &&
                $("#porcentajeInversionInput2").val()
            ) {
                var porcentaje1 = $("#porcentajeInversionInput").val();
                var porcentaje2 = $("#porcentajeInversionInput2").val();
                var dolar_peso = $("#tipoCambioInput").val();
                var inversionMXN1;
                var inversionUSD1;
                var inversionMXN2;
                var inversionUSD2;

                if (porcentaje1.toString().length == 1) {
                    porcentaje1 = `0.0${porcentaje1}`;
                    porcentaje1 = parseFloat(porcentaje1);

                    inversionMXN1 = $("#inversionInput").val() * porcentaje1;
                } else {
                    porcentaje1 = `0.${porcentaje1}`;
                    porcentaje1 = parseFloat(porcentaje1);
                    inversionMXN1 = $("#inversionInput").val() * porcentaje1;
                }

                if (porcentaje2.toString().length == 1) {
                    porcentaje2 = `0.0${porcentaje2}`;
                    porcentaje2 = parseFloat(porcentaje2);

                    inversionMXN2 = $("#inversionInput").val() * porcentaje2;
                } else {
                    porcentaje2 = `0.${porcentaje2}`;
                    porcentaje2 = parseFloat(porcentaje2);
                    inversionMXN2 = $("#inversionInput").val() * porcentaje2;
                }

                inversionMXN1 = inversionMXN1.toFixed(2);
                inversionUSD1 = (inversionMXN1 / dolar_peso).toFixed(2);

                $("#inversionMXN1").val(inversionMXN1);
                $("#inversionUSD1").val(inversionUSD1);

                inversionMXN2 = inversionMXN2.toFixed(2);
                inversionUSD2 = (inversionMXN2 / dolar_peso).toFixed(2);

                $("#inversionMXN2").val(inversionMXN2);
                $("#inversionUSD2").val(inversionUSD2);

                $("#contTabla").empty();

                var tipo_contrato = $("option:selected", "#tipoIdInput").attr(
                    "data-tipo"
                );

                if (tipo_contrato == "Rendimiento compuesto") {
                    $("#contTabla").append(`
                    <div class="col-12">
                    <div class="alert alert-primary d-flex align-items-center" role="alert">
                        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Info:">
                            <use xlink:href="#info-fill" />
                        </svg>
                        <div>
                            Inversión del primer contrato de tipo ${tipo_contrato} al ${$(
                        "#porcentajeInversionInput"
                    ).val()}% de la inversión inicial:
                        </div>
                    </div>
                </div>
                        <div class="table-responsive">
                            <table class="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">Serie</th>
                                        <th scope="col">Capital (MXN)</th>
                                        <th scope="col">Capital (USD)</th>
                                        <th scope="col">Fecha</th>
                                    </tr>
                                </thead>
                                <tbody id="tablaBody">                        
                                </tbody>
                            </table>
                        </div>
                    `);
                } else if (tipo_contrato == "Rendimiento mensual") {
                    $("#contTabla").append(`
                    <div class="col-12">
                    <div class="alert alert-primary d-flex align-items-center" role="alert">
                        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Info:">
                            <use xlink:href="#info-fill" />
                        </svg>
                        <div>
                            Inversión del primer contrato de tipo ${tipo_contrato} al ${$(
                        "#porcentajeInversionInput"
                    ).val()}% de la inversión inicial:
                        </div>
                    </div>
                </div>
                        <div class="table-responsive">
                            <table class="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">Serie</th>
                                        <th scope="col">Capital (MXN)</th>
                                        <th scope="col">Capital (USD)</th>
                                        <th scope="col">Interés</th>
                                        <th scope="col">Fecha</th>
                                    </tr>
                                </thead>
                                <tbody id="tablaBody">                        
                                </tbody>
                            </table>
                        </div>
                    `);
                }

                var inversionMXN = $("#inversionMXN1").val();
                inversionMXN = parseFloat(inversionMXN);

                var inversionUSD = $("#inversionUSD1").val();
                inversionUSD = parseFloat(inversionUSD);

                var porcentaje = $("#porcentajeInput").val();
                porcentaje = parseFloat(porcentaje);

                var fecha = $("#fechaInicioInput").val();
                var porcentaje = $("#porcentajeInput").val();
                var usd = parseFloat($("#tipoCambioInput").val());

                for (var i = 0; i < meses; i++) {
                    fecha = new Date(fecha);
                    fecha = fecha.setMonth(fecha.getMonth() + 1);
                    fecha = new Date(fecha);
                    fecha = fecha.addDays(1);
                    fecha = formatDate(fecha);

                    var fechaInput = fecha.split("/").reverse().join("-");

                    var formatterUSD = new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                    });

                    var formatterMXN = new Intl.NumberFormat("es-MX", {
                        style: "currency",
                        currency: "MXN",
                    });

                    if (tipo_contrato == "Rendimiento compuesto") {
                        $("#tablaBody").append(` 
                        <tr>
                            <th scope="row">${i + 1}</th>
                            <td>${formatterMXN.format(inversionMXN)}</td>
                            <td>${formatterUSD.format(inversionUSD)}</td>
                            <td>${fecha}</td>
                        </tr>
                        `);
                        var porcentaje2 = `0.0${porcentaje}`;
                        porcentaje2 = parseFloat(porcentaje2);

                        inversionMXN =
                            inversionMXN + inversionMXN * porcentaje2;
                        inversionUSD = inversionMXN / usd;
                    } else if (tipo_contrato == "Rendimiento mensual") {
                        var porcentaje2 = `0.0${porcentaje}`;
                        porcentaje2 = parseFloat(porcentaje2);
                        $("#tablaBody").append(` 
                        <tr>
                            <th scope="row">${i + 1}</th>
                            <td>${formatterMXN.format(inversionMXN)}</td>
                            <td>${formatterUSD.format(inversionUSD)}</td>
                            <td>${formatterUSD.format(
                                inversionUSD * porcentaje2
                            )}</td>
                            <td>${fecha}</td>
                        </tr>
                        `);
                    }

                    fecha = fecha.split("/").reverse().join("-");
                }

                $("#contTabla2").empty();

                var tipo_contrato2 = $("option:selected", "#tipoIdInput2").attr(
                    "data-tipo"
                );

                if (tipo_contrato2 == "Rendimiento compuesto") {
                    $("#contTabla2").append(`
                        <div class="col-12">
                            <div class="alert alert-primary d-flex align-items-center" role="alert">
                                <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Info:">
                                    <use xlink:href="#info-fill" />
                                </svg>
                                <div>
                                    Inversión del segundo contrato de tipo ${tipo_contrato2} al ${$(
                        "#porcentajeInversionInput2"
                    ).val()}% de la inversión inicial:
                                </div>
                            </div>
                        </div>
                        <div class="table-responsive">
                            <table class="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">Serie</th>
                                        <th scope="col">Capital (MXN)</th>
                                        <th scope="col">Capital (USD)</th>
                                        <th scope="col">Fecha</th>
                                    </tr>
                                </thead>
                                <tbody id="tablaBody2">                        
                                </tbody>
                            </table>
                        </div>
                    `);
                } else if (tipo_contrato2 == "Rendimiento mensual") {
                    $("#contTabla2").append(`
                    <div class="col-12">
                    <div class="alert alert-primary d-flex align-items-center" role="alert">
                        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Info:">
                            <use xlink:href="#info-fill" />
                        </svg>
                        <div>
                            Inversión del segundo contrato de tipo ${tipo_contrato2} al ${$(
                        "#porcentajeInversionInput2"
                    ).val()}% de la inversión inicial:
                        </div>
                    </div>
                </div>
                        <div class="table-responsive">
                            <table class="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">Serie</th>
                                        <th scope="col">Capital (MXN)</th>
                                        <th scope="col">Capital (USD)</th>
                                        <th scope="col">Interés</th>
                                        <th scope="col">Fecha</th>
                                    </tr>
                                </thead>
                                <tbody id="tablaBody2">                        
                                </tbody>
                            </table>
                        </div>
                    `);
                }

                var inversionMXN = $("#inversionMXN2").val();
                inversionMXN = parseFloat(inversionMXN);

                var inversionUSD = $("#inversionUSD2").val();
                inversionUSD = parseFloat(inversionUSD);

                var porcentaje = $("#porcentajeInput2").val();
                porcentaje = parseFloat(porcentaje);

                var fecha = $("#fechaInicioInput").val();
                var porcentaje = $("#porcentajeInput2").val();
                var usd = parseFloat($("#tipoCambioInput").val());

                for (var i = 0; i < meses; i++) {
                    fecha = new Date(fecha);
                    fecha = fecha.setMonth(fecha.getMonth() + 1);
                    fecha = new Date(fecha);
                    fecha = fecha.addDays(1);
                    fecha = formatDate(fecha);

                    var fechaInput = fecha.split("/").reverse().join("-");

                    var formatterUSD = new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                    });

                    var formatterMXN = new Intl.NumberFormat("es-MX", {
                        style: "currency",
                        currency: "MXN",
                    });

                    if (tipo_contrato2 == "Rendimiento compuesto") {
                        $("#tablaBody2").append(` 
                        <tr>
                            <th scope="row">${i + 1}</th>
                            <td>${formatterMXN.format(inversionMXN)}</td>
                            <td>${formatterUSD.format(inversionUSD)}</td>
                            <td>${fecha}</td>
                        </tr>
                        `);
                        var porcentaje2 = `0.0${porcentaje}`;
                        porcentaje2 = parseFloat(porcentaje2);

                        inversionMXN =
                            inversionMXN + inversionMXN * porcentaje2;
                        inversionUSD = inversionMXN / usd;
                    } else if (tipo_contrato2 == "Rendimiento mensual") {
                        var porcentaje2 = `0.0${porcentaje}`;
                        porcentaje2 = parseFloat(porcentaje2);
                        $("#tablaBody2").append(` 
                        <tr>
                            <th scope="row">${i + 1}</th>
                            <td>${formatterMXN.format(inversionMXN)}</td>
                            <td>${formatterUSD.format(inversionUSD)}</td>
                            <td>${formatterUSD.format(
                                inversionUSD * porcentaje2
                            )}</td>
                            <td>${fecha}</td>
                        </tr>
                        `);
                    }

                    fecha = fecha.split("/").reverse().join("-");
                }
            }
        }
    }
});
