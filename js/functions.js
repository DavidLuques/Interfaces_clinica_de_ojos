    async function incluirNavBar() {

        const response = await fetch('./components/navbar.html');
        let res = await response.text();
        document.querySelector('#navbar-container').innerHTML = res
    }
    async function incluirFooter() {
        const response = await fetch('./components/footer.html');
        let res = await response.text();
        document.querySelector("#footer-container").innerHTML = res
    }

    incluirNavBar();
    incluirFooter();

    document.addEventListener("DOMContentLoaded", () => {
        const form = document.getElementById("contactoForm");

        if (form) {
            form.addEventListener("submit", function(e) {
                e.preventDefault();

                const nombre = document.getElementById("nombreContacto");
                const email = document.getElementById("emailContacto");
                const asunto = document.getElementById("asuntoContacto");
                const mensaje = document.getElementById("mensajeContacto");

                let esValido = true;

                [nombre, asunto, mensaje].forEach((campo) => {
                    if (!campo.value.trim()) {
                        campo.classList.add("is-invalid");
                        esValido = false;
                    } else {
                        campo.classList.remove("is-invalid");
                    }
                });

                const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!regex.test(email.value)) {
                    email.classList.add("is-invalid");
                    esValido = false;
                } else {
                    email.classList.remove("is-invalid");
                }

                if (!esValido) return;

                document.getElementById("contactoForm").style.display = "none";
                document.getElementById("detalleFinalContacto").innerHTML =
                    `Gracias <strong>${nombre.value}</strong>, recibimos tu mensaje con el asunto "<strong>${asunto.value}</strong>". Nos pondremos en contacto a la brevedad.`;
                document.getElementById("pantallaFinalContacto").style.display = "block";
            });
        }
    });