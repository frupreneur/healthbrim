import { DATABASE } from './DATABASE.js'

    let presentLocation = location.pathname.slice(8).slice(0, location.pathname.slice(8).indexOf('/'));
    
    if(location.pathname.includes('index')){
        presentLocation = 'index.html'
    }

    favIconSetter('../../assets/favicon.ico');

    for(let xDisease in DATABASE){
        if(DATABASE[xDisease].route === presentLocation){

            // get title
            let head = document.querySelector('head');
            let title = document.querySelector('title');
            title.innerText = `${DATABASE[xDisease].title} - Check your health Status`

            // Meta Data
            const metaDescription = document.createElement('meta');
                metaDescription.setAttribute('property', 'description')
                metaDescription.setAttribute('content', DATABASE[xDisease].description)
                title.after(metaDescription)

            const ogTitle = document.createElement('meta');
                ogTitle.setAttribute('property', 'og:title')
                ogTitle.setAttribute('content', `${DATABASE[xDisease].title} - Check your health Status`)
                metaDescription.after(ogTitle)

            const ogType = document.createElement('meta');
                ogType.setAttribute('property', 'og:type')
                ogType.setAttribute('content', `article`)
                ogTitle.after(ogType)

            const ogDescription = document.createElement('meta');
                ogDescription.setAttribute('property', 'og:description')
                ogDescription.setAttribute('content', DATABASE[xDisease].description)
                ogType.after(ogDescription)

            const ogUrl = document.createElement('meta');
                ogUrl.setAttribute('property', 'og:url')
                ogUrl.setAttribute('content', `${window.location.href}`)
                ogDescription.after(ogUrl)
        }
   }

   function favIconSetter(favImg){
        let headTitle = document.querySelector('head');
        let setFavicon = document.createElement('link');
        setFavicon.setAttribute('rel','shortcut icon');
        setFavicon.setAttribute('href',favImg);
        headTitle.appendChild(setFavicon);
    }
