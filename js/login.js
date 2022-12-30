// const url_base = "http://127.0.0.1:8000/"
const url_base = "https://apipagosrailway-production.up.railway.app/"
const form = document.querySelector("form")
const email = document.getElementById("email")
const password = document.getElementById("password")

form.onsubmit = async function (event) {
	event.preventDefault();
	const body = {
		email: email.value,
		password: password.value,
	};

	try {
	    const response = await fetch(url_base+"users/login/", {
	      	method: "POST",
	      	headers: {"Content-Type": "application/json"},
	      	body: JSON.stringify(body),
	    });
	    const data = await response.json();

	    if (data.tokens) {
	    	const user = {
	    		email: data.email,
	    		id: data.id,
	    		username: data.username,
	    		superuser: data.superuser,
	    		token_access: data.tokens.access,
	    		token_refresh: data.tokens.refresh
	    	}
	    	localStorage.setItem("sesion_app_pagos", JSON.stringify(user));
	    	window.location.href = "./index.html";
	    }else{
	    	Swal.fire({text: data.message, icon: "error"});
	    }
	}catch (error) {
	    Swal.fire({text: error, icon: "error"});
	}
};