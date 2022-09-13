import { DATABASE } from './DATABASE.js'

export function header() {
    const head = document.querySelector('head');
    head.innerHTML += 
    `
            <!-- Google tag (gtag.js) -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-WR93F70PG6"></script>
        <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-WR93F70PG6');
        </script>
   `
    const body = document.querySelector('body');
    const header = document.createElement('div');

    header.innerHTML = `
    <header>
    </header>

    <nav id="nav">
        <ul id='menus'>
        <li class="logo"><a href="/">HEALTHBRIM.</a></li>
        <li class="menu-icon"><i class="fa-solid fa-bars"></i></li>
            <ul class="secondary offEl">
                <li><a href="/index.html">Home</a></li>
                <li><a href="/about.html">About</a></li>
                <li><a href="/disclaimer.html">Disclaimer/Privacy</a></li>
                <li><a href="/contact.html">Contact us</a></li>
            </ul>
        </ul>
    </nav>
    `;

    body.insertBefore(header, body.children[0])

    // Mobile Menu
    const menuIcon = document.querySelector('.menu-icon')
    menuIcon.addEventListener('click', () => {
        const popup = document.querySelector('.secondary')
        if (popup.classList.contains('offEl')) {
            popup.classList.remove('offEl')
        } else {
            popup.classList.add('offEl')
        }
    })
}

export function routeTo(x) {
    location.assign(x)
}

