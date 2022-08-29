export function footer(){
    const body = document.querySelector('body');
    const  footer = document.createElement('footer');
    footer.classList.add('footer')

    footer.innerHTML = `
    <ul class="footer-menu">
        <li><a href="/index.html">Home</a></li>
        <li><a href="/about.html">About</a></li>
        <li><a href="/disclaimer.html">Disclaimer/Privacy</a></li>
        <li><a href="/contact.html">Contact us</a></li>
    </ul>
    <p>All rights reserved © Copyright 2022, HealthBrim. </p>`;
    
   

    body.appendChild(footer )
}



