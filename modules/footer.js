export function footer(){
    const body = document.querySelector('body');
    const  footer = document.createElement('div');
    footer.classList.add('footer')

    footer.innerHTML = `
    <h3>Disclaimer</h3>
All diagnosis from our tools or blog should not be taken as 100% accurate, we encourage you to visit your medical doctor for full checkup to confirm any diagnosis on HealthBrim<br/><br/>
    All rights reserved © Copyright 2022, HealthBrim. `;
    body.appendChild(footer )
}

