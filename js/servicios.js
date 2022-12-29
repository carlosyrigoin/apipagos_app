const form_servicio = document.getElementById("form_servicio")
const inputs = document.querySelectorAll("input");

const form_actualizar_servicio = document.getElementById("form_actualizar_servicio")
const service_id = document.getElementById("service_id")
const name = document.getElementById("name")
const descripcion = document.getElementById("descripcion")
const logo = document.getElementById("logo")

async function getServicios() {
	service_id.innerHTML = '<option value="">Seleccione . . .</option>'
	const response = await fetch(url_base+"api/services/", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"Authorization": "Bearer "+sesion_app_pagos.token_access
		},
	});
	const data = await response.json();

	data.results.forEach((servicio) => {
		service_id.innerHTML += `<option value="${servicio.id}">${servicio.name}</option>`;
	});
}

getServicios();


form_servicio.onsubmit = async function (event) {
	event.preventDefault();
	const body = {};
	inputs.forEach((input) => (body[input.name] = input.value));

	try {
	    const response = await fetch(url_base+"api/services_create/", {
	      	method: "POST",
	      	headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer "+sesion_app_pagos.token_access
			},
	      	body: JSON.stringify(body),
	    });
	    const data = await response.json();

	    if (data.id) {
	    	Swal.fire({text: "Servicio registrado correctamente", icon: "success"});
	    	form_servicio.reset();
	    	getServicios();
	    }else{
	    	Swal.fire({text: "Ocurrió un error al registrar servicio", icon: "error"});
	    }
	}catch (error) {
	    Swal.fire({text: error, icon: "error"});
	}
};

service_id.onchange = async function () {
	try {
	    const response = await fetch(url_base+"api/services_detail/"+service_id.value+"/", {
	      	method: "GET",
	      	headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer "+sesion_app_pagos.token_access
			}
	    });
	    const data = await response.json();

	    if (data) {
	    	name.value = data.name
	    	descripcion.value = data.descripcion
	    	logo.value = data.logo
	    }else{
	    	Swal.fire({text: "Ocurrió un error al cargar servicio", icon: "error"});
	    }
	}catch (error) {
	    Swal.fire({text: error, icon: "error"});
	}
};

form_actualizar_servicio.onsubmit = async function (event) {
	event.preventDefault();
	const body = {
		id: service_id.value,
		name: name.value,
		descripcion: descripcion.value,
		logo: logo.value
	};

	try {
	    const response = await fetch(url_base+"api/services_detail/"+service_id.value+"/", {
	      	method: "PUT",
	      	headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer "+sesion_app_pagos.token_access
			},
	      	body: JSON.stringify(body),
	    });
	    const data = await response.json();

	    if (data.id) {
	    	Swal.fire({text: "Servicio actualizado correctamente", icon: "success"});
	    	form_actualizar_servicio.reset();
	    	getServicios();
	    }else{
	    	Swal.fire({text: "Ocurrió un error al actualizar servicio", icon: "error"});
	    }
	}catch (error) {
	    Swal.fire({text: error, icon: "error"});
	}
};