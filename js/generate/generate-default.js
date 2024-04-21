import { losujPonownie } from "../losowanie.js";
import { sprawdzanie } from "../losowanie.js";

// funkcja generuje wszystkie pytania
export function generateData(response,id){
    let main = document.querySelector('.question-center');
    let btnCenter = document.querySelector('.btn-center');
    let dobre_odpowiedzi = [];
    let elements = [];
    let examID = document.querySelector('.exam-id');
    let sprawdz = document.createElement('div');
    let navQuestions = document.querySelector('.nav-questions');

    examID.value = id;

    sprawdz.classList.add('sprawdz');
    sprawdz.textContent = "Sprawdz Odpowiedzi";
    btnCenter.append(sprawdz);

    let losuj = document.createElement('div');

    losuj.classList.add('losuj');
    losuj.textContent = "Losuj Dalej";
    btnCenter.append(losuj);

    let element_sprawdz = document.querySelector('.sprawdz');
    if(response && response.length > 0) {

        for(let i = 0; i < response.length; i++) {
            let element = document.createElement('div');
            element.textContent = i;
            element.classList.add('nav-item-id');
            element.setAttribute('data-id', i);

            navQuestions.append(element);
        }

        response.forEach((res, i) => {
            let text = `
                <div class="id-element">
                    <span>
                        Pytanie: <span class="id">${i}</span>
                    </span>
                </div>
                <div class="img">
                    <img src="${res.obrazek}" alt="">
                </div>
                <div class="title">
                </div>
                <div class="answers">
                    <ul class="answers-list">
                        <li class="answer"><p></p></li>
                        <li class="answer"><p></p></li>
                        <li class="answer"><p></p></li>
                        <li class="answer"><p></p></li>
                    </ul>
                </div>`;
    
            let element = document.createElement('div');
            element.classList.add('pytanie');
            element.classList.add(i);
            element.setAttribute('data-id', i);
            element.innerHTML = text;
            main.append(element);

            let title = element.querySelector('.title');
            title.textContent = res.title;

            let answers = [res.A,res.B,res.C,res.D];
            let answerEl = element.querySelectorAll('.answer');

            answerEl.forEach((answer,i) => {
                answer.textContent = answers[i];
            })

            dobre_odpowiedzi.push({poprawna: res.poprawna_odp});
            elements.push(element);
        })    
        sprawdzanie(elements,dobre_odpowiedzi);
        losujPonownie();
        initialCustomGameMode(elements); 
    }else {
        //console.log("No data to generate.")
    }
}


function initialCustomGameMode(elements) {
    let firstElement = elements[0];
    firstElement.classList.add("active");

    let navItems = document.querySelectorAll('.nav-item-id');

    navItems.forEach(el => {
        el.addEventListener('click', (e) => {
            let currentElement = e.target;
            let id = currentElement.dataset.id;

            elements.forEach(element => {
                let elementId = element.dataset.id;


                if(elementId == id) {
                    elements.forEach(el => {
                        el.classList.remove('active');
                    })

                    element.classList.add('active');
                }
            })
        })
    })
}
