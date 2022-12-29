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

getPagos();

function renderPagoRealizado(pago) {
	return `
		<tr>
			<td>${pago.user_id}</td>
			<td>${pago.service_id}</td>
			<td>${pago.paymentdate}</td>
			<td>${pago.amount}</td>
		</tr>
	`;
}