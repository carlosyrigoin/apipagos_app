const container_pagos_realizados = document.getElementById("pagos_realizados")
const container_pagos_vencidos = document.getElementById("pagos_vencidos")

async function getPagos() {
	const response = await fetch(url_base+"api/payment_user/", {
      	method: "GET",
      	headers: {
      		"Content-Type": "application/json",
      		"Authorization": "Bearer "+sesion_app_pagos.token_access
      	},
    });
	const data = await response.json();

	data.results.forEach((pago) => {
		container_pagos_realizados.innerHTML += renderPagoRealizado(pago);
	});
}

async function getPagosVencidos() {
	const response = await fetch(url_base+"api/expired_payments/", {
      	method: "GET",
      	headers: {
      		"Content-Type": "application/json",
      		"Authorization": "Bearer "+sesion_app_pagos.token_access
      	},
    });
	const data = await response.json();

	data.results.forEach((pago) => {
		container_pagos_vencidos.innerHTML += renderPagoVencido(pago);
	});
}

getPagos();
getPagosVencidos();

function renderPagoRealizado(pago) {
	return `
		<tr>
			<td><i class="fe-file-text"></i></td>
			<td>Codigo servicio: ${pago.service_id}</td>
			<td>${pago.paymentdate}</td>
			<td>${pago.amount}</td>
		</tr>
	`;
}

function renderPagoVencido(pago) {
	return `
		<tr>
			<td class="text-white"><i class="fe-file-text"></i></td>
			<td class="text-white">Codigo servicio de usuario: ${pago.pay_user_id}</td>
			<td class="text-white">${pago.penalty_free_amount}</td>
		</tr>
	`;
}