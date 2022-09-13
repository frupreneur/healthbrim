import { DATABASE } from './DATABASE.js'

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