// imports
import { header } from './modules/header.js'
import { routeTo } from './modules/header.js'
import { footer } from './modules/footer.js'
import { DATABASE } from './modules/DATABASE.js'

// DOM
const siteWrap = document.querySelector('.site-wrap')
const relatedWrap = document.querySelector('.related-wrapper')
const questionWrapper = document.querySelector('.question-wrapper')
const resultsWrapper = document.querySelector('.results-wrapper')

// execution
header()
footer()

if (siteWrap) {
    for (let disease in DATABASE) {
        let diseaseContainer = document.createElement('div');
        diseaseContainer.classList.add('disease-container')
        diseaseContainer.innerHTML =
            `
        <h2>${DATABASE[disease].title}</h2>
        <p>${DATABASE[disease].description}</p>
        <br/>
        <a href="${location.protocol + '//' + location.host + '/routes/' + DATABASE[disease].route}"><button name='${disease}' class="nextBTN">Check Symptoms</button></a>
        `
        siteWrap.appendChild(diseaseContainer)
    }
}

if (relatedWrap) {
    const relatedMain = document.querySelector('.related-main')
    const relatedTitle = document.createElement('h2')
    relatedTitle.classList.add('related-title')

    relatedTitle.innerText = 'Popular On HealthBrim'
    relatedMain.insertBefore(relatedTitle,relatedWrap)

    const mainDiseaseArray = [];
    const relatedDiseaseArray = [];
    let presentDisease = location.pathname.slice(7);

    if(presentDisease.includes('results.html')){
        presentDisease = presentDisease.slice(0,-12)
    }

    Object.entries(DATABASE).forEach(x=>{
        if(presentDisease !== `/${x[1].route}/`){
            mainDiseaseArray.push(x)
        }
    })

    while(relatedDiseaseArray.length < 4){
        let randomDisease = mainDiseaseArray[Math.floor(Math.random() * mainDiseaseArray.length)]
        let isInRelatedDisease = relatedDiseaseArray.every(x =>  x[0] !== randomDisease[0])

        if(isInRelatedDisease){
            relatedDiseaseArray.push(randomDisease)
        }
    }

    relatedDiseaseArray.forEach(relatedDisease =>{
        let diseaseContainer = document.createElement('div');
        diseaseContainer.classList.add('disease-container')
        diseaseContainer.innerHTML =
            `
        <h2>${relatedDisease[1].title}</h2>
        <p>${relatedDisease[1].description}</p>
        <br/>
        <a href="${location.protocol + '//' + location.host + '/routes/' + relatedDisease[1].route}"><button name='${relatedDisease[0]}' class="nextBTN">Check Symptoms</button></a>
        `
        relatedWrap.appendChild(diseaseContainer)
    })
}

// questions handler
if (questionWrapper) {
    const clickedDisease = location.pathname.slice(7)

    for (const disease in DATABASE) {
        if (clickedDisease.includes(DATABASE[disease].route)) {

            let title = document.querySelector('.title-container')
            title.innerText = `${DATABASE[disease].title}`

            // // questionWrapper.appendChild(title)
            // document.title = `${DATABASE[disease].title} - HealthBrim`;

            let questionContainer = document.createElement('div');
            questionContainer.classList.add('questionContainer')
            let idx = 0;

            questionContainer.innerHTML =
                `
             <h3>${DATABASE[disease].questions[idx].question}</h3>
             ${DATABASE[disease].questions[idx].answers.map((x, i) => {
                    return `
                    <div class='answer-container'>
                        <input id=${i} type='radio' name='answer'/>
                        <label class=${i}>${x}</label>
                    </div>
                `
                }).join('')}
             `            
             questionWrapper.appendChild(questionContainer)
           
             // answer answerHandler
            answerHandler(DATABASE, disease, idx, questionContainer, questionWrapper)
        }
    }
}


// results handler
if (resultsWrapper) {
    let diseaseName, conclusion;
    const diseaseRoute = location.pathname.slice(8).slice(0, location.pathname.slice(8).indexOf('/'))

    for (let disease in DATABASE) {
        if (DATABASE[disease].route === diseaseRoute) {
            diseaseName = disease
        }
    }
    const answerString = location.href.slice(location.href.indexOf('=') + 1).split('-')
    const correctAnswers = answerString[0];
    const totalQuestions = answerString[1];
    const resultPara = `
        Based on your answers, You have ${correctAnswers} symptom(s) people with ${diseaseName} have complained of to medical doctors.
    `
    if (correctAnswers / totalQuestions < 0.8) {
        conclusion = ` <p style="color:green">From your answers, there is a very low chance you have ${diseaseName}. <p>`
    } else {
        conclusion = ` <p  style="color:red">From your answers, you posses some symptoms of ${diseaseName} patients have complained of to medical doctors.. (Please don't take this result as final, check with a doctor to run actual tests to confirm.)`
    }


    resultsWrapper.innerHTML = `

     <h2 style="color: rgba(0,0,0,0.7); margin-top: 10px;">Diagnosis Results</h2>
     ${conclusion}
    `

    // share container
    let shareContainer = document.querySelector('.share-container')

    shareContainer.innerHTML = `
    <h2 class="share-title">HELP YOUR FRIENDS STAY HEALTHY</h2>
    <p class="share-description"> Share this website with your friends so they can check their health too.</p>
            <div class='wa-share'>
                
                <a class="whatsapp" href=
            "whatsapp://send?text=${DATABASE[diseaseName].title} - Check your Health. %0a %0aClick here to check your health => ${window.location.href.slice(0, window.location.href.indexOf('?') - 13)} "
                    data-action="share/whatsapp/share"
                    target="_blank">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>
                    Share On WhatsApp
                </a>

                <a  class="facebook" href="https://www.facebook.com/sharer/sharer.php?u=${window.location.href.slice(0, window.location.href.indexOf('?') - 13)}&t=${DATABASE[diseaseName].title} - Check your Health} "

                    target="_blank">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"/></svg>
                    Share On Facebook
                </a>
            
            </div>
    `

}

// functions
function displayLoading(x, m = "") {
    let loading = document.createElement('div')
    loading.classList.add('loading')
    Array.from(x.children).forEach(element => {
        element.style.display = 'none'
    });
    let message = document.createElement('p')
    message.innerHTML = m
    x.appendChild(message)
    x.appendChild(loading)
}

function answerHandler(db, d, idx, questionContainer, questionWrapper) {
    // answer containter handler
    setTimeout(() => {
        const answerEls = document.querySelectorAll('.answer-container')

        answerEls.forEach(answerEl => {
            answerEl.addEventListener('click', (e) => {
                const inputtedEl = e.currentTarget.querySelector('input');

                // Activate
                answerEls.forEach(answerEl2 => answerEl2.classList.remove('active'))
                e.currentTarget.classList.add('active');
                inputtedEl.checked = true;

                // Submit Result
                submitResult(db, d, idx)

                // Display loading
                setTimeout(() => {
                    displayLoading(questionContainer, `Registering answer... <br/> <br/>`)
                }, 250)
                // Generate results
                resultGenerator(db, d, idx, questionContainer, questionWrapper)
            })
        })
    }, 100)
}


function submitResult(db, d, idx) {
    setTimeout(() => {
        const selectedInput = document.querySelectorAll('.answer-container.active input')
        selectedInput.forEach(input => {
            if (input.checked) {
                const submitted = input.nextElementSibling.innerText
                if (submitted === db[d].questions[idx].correct) {
                    db[d].result++
                }
            }
        })
    }, 500)
}

function resultGenerator(db, d, idx, questionContainer, questionWrapper) {
    setTimeout(() => {
        idx++
        if (idx > db[d].questions.length - 1) {
            displayLoading(questionWrapper, `Generating results... <br/> <br/>`)
            setTimeout(() => {
                routeTo(`${location.pathname}results.html?=${db[d].result}-${db[d].questions.length}`)
            }, 5000)

            return
        }

        questionContainer.innerHTML =
            `
                <h3>${db[d].questions[idx].question}</h3>
                ${db[d].questions[idx].answers.map((x, i) => {
                return `
                        <div class='answer-container'>
                            <input id=${i} type='radio' name='answer'/>
                            <label class=${i}>${x}</label>
                        </div>
                    `
            }).join('')}
            `
        // set next button disabled
        answerHandler(db, d, idx, questionContainer, questionWrapper)
    }, 1500)

}



