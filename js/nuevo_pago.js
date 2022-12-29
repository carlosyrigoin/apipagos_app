const container_servicios = document.getElementById("service_id")
const form = document.querySelector("form")
const inputs = document.querySelectorAll("input");
const select = document.querySelector("select");

async function getServicios() {
	const response = await fetch(url_base+"api/services/", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"Authorization": "Bearer "+sesion_app_pagos.token_access
		},
	});
	const data = await response.json();

	data.results.forEach((servicio) => {
		container_servicios.innerHTML += `<option value="${servicio.id}">${servicio.name}</option>`;
	});
}

getServicios();


form.onsubmit = async function (event) {
	event.preventDefault();
	const body = {
		user_id: sesion_app_pagos.id,
		service_id: select.value
	};
	inputs.forEach((input) => (body[input.name] = input.value));

	try {
	    const response = await fetch(url_base+"api/payment_user/", {
	      	method: "POST",
	      	headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer "+sesion_app_pagos.token_access
			},
	      	body: JSON.stringify(body),
	    });
	    const data = await response.json();

	    if (data.id) {
	    	Swal.fire({text: "Pago registrado correctamente", icon: "success"});
	    	form.reset();
	    }else{
	    	Swal.fire({text: "Ocurrió un error al registrar pago", icon: "error"});
	    }
	}catch (error) {
	    Swal.fire({text: error, icon: "error"});
	}
};