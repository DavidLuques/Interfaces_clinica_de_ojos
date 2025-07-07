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