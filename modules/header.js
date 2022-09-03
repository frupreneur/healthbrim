import { DATABASE } from './DATABASE.js'

export function header() {
    const head = document.querySelector('head');
    head.innerHTML += `
    <!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-WR93F70PG6"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-WR93F70PG6');
</script>
   `

   let presentLocation = location.pathname.slice(8).slice(0, location.pathname.slice(8).indexOf('/'));
   if(location.pathname.includes('index')){
    presentLocation = 'index.html'
   }

   for(let xDisease in DATABASE){
    if(DATABASE[xDisease].route === presentLocation){
        // Meta Data
        const metaDescription = document.querySelector('meta[name="description"]')
        const ogTitle = document.querySelector('meta[property="og:title"]')
        const ogType = document.querySelector('meta[property="og:type"]')
        const ogDescription = document.querySelector('meta[property="og:description"]')
        const ogUrl = document.querySelector('meta[property="og:url"]')

        metaDescription.setAttribute('content', DATABASE[xDisease].description)
        ogTitle.setAttribute('content', `${DATABASE[xDisease].title} - Check your health Status`)
        ogType.setAttribute('content', 'article')
        ogDescription.setAttribute('content', DATABASE[xDisease].description)
        ogUrl.setAttribute('content',  `${window.location.href}`)
    }

   }



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

