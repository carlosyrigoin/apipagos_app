const url_base = "http://127.0.0.1:8000/"
const sesion_app_pagos = JSON.parse(localStorage.getItem("sesion_app_pagos")) ?? {}
if (Object.entries(sesion_app_pagos).length === 0) {
	window.location.href = "./login.html"
}

if (sesion_app_pagos.superuser === true) {
	const id_admin = document.getElementById("admin")
	id_admin.setAttribute("class", "nav-item")
}
const text_username = document.getElementById("text_username");
text_username.textContent = sesion_app_pagos.username

function cerrar_sesion() {
	Swal.fire({
  		title: 'Seguro desea cerrar sesión ?',
		showCancelButton: true,
		confirmButtonText: 'Si, cerrar sesión',
	}).then((result) => {
	  	if (result.isConfirmed) {
		  	localStorage.removeItem("sesion_app_pagos");
		  	window.location.href = "./login.html"
	  	}
	})
}
