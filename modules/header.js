import { DATABASE } from './DATABASE.js'



export function header() {
    const head = document.querySelector('head');
    head.innerHTML += `
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4787236575206177"
     crossorigin="anonymous"></script>
    `



    const body = document.querySelector('body');
    const header = document.createElement('div');

    header.innerHTML = `
    <header>
    </header>

    <nav id="nav">
        <ul id='menus'>
        <li class="logo"><a href="#">HEALTHBRIM.</a></li>
        <li class="menu-icon"><i class="fa-solid fa-bars"></i></li>
            <ul class="secondary offEl">
                <li id="home">Home</li>
                <li id="about">About</li>
                <li id="images">Disclaimer / Policy</li>
                <li id="locations">Contact Us</li>
            </ul>
        </ul>
    </nav>
    
    `;




    body.insertBefore(header, body.children[0])


    const menuIcon = document.querySelector('.menu-icon')
    menuIcon.addEventListener('click', () => {
        const popup = document.querySelector('.secondary')
        if (popup.classList.contains('offEl')) {
            popup.classList.remove('offEl')
        } else {
            popup.classList.add('offEl')
        }

    })

    setTimeout(() => {

        // event listeners
        const menus = document.querySelector('#menus')
        menus.childNodes.forEach(menu => {
            menu.addEventListener('click', handleMenuClick)
        })

        // menu click handler
        function handleMenuClick(e) {
            let clickedMenu = e.target.textContent.toLowerCase();
            if (clickedMenu) {
                if (clickedMenu === 'home') clickedMenu = 'index';
                if (clickedMenu === 'healthbrim.') clickedMenu = 'index';
                if (clickedMenu === 'disclaimer / policy') clickedMenu = 'disclaimer';
                if (clickedMenu === 'contact us') clickedMenu = 'contact';

                routeTo(`/${clickedMenu}.html`)
            }







        }
    }, 0)
}


export function routeTo(x) {
    location.assign(x)
}

