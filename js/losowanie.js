window.addEventListener('DOMContentLoaded', () => {
    let btnsE = document.querySelectorAll('.list-item');
    let main = document.querySelector('.question-center');
    let data = sessionStorage.getItem('response');

    if(data !== ""){
        generateData(JSON.parse(data));
    }else{
        console.log("e")
    }

    btnsE.forEach(btn => {
        btn.addEventListener('click', (e) => {
            let currentElement = e.currentTarget;
            let id = currentElement.dataset.id;
            let resultTitle = document.querySelector('.result-title')
            let resultWynik = document.querySelector('.wynik')
            let resultProcent = document.querySelector('.procent')
            resultTitle.textContent = "";
            resultProcent.textContent = "";
            resultWynik.textContent = "";
            main.innerHTML = "";
            sessionStorage.removeItem('response');
            sendData(id);
        })
    })
})

async function sendData(id){
    try{
        switch(id){
            case "inf02-40":
                fetchData("inf02Random",40);
            break;
            case "inf02-1":
                fetchData("inf02Random",1);
            break;
            case "inf03-40":
                fetchData("inf03Random",40);
            break;
            case "inf03-1":
                fetchData("inf03Random",1);
            break;
        }
    }catch(error){
        console.log(error);
    }
}

async function fetchData(dbID, count){
    try{
        let request = await fetch(`php/${dbID}.php`,{
            method: 'post',
            body: 'count=' + count,
            headers: {
                'Content-type': "application/x-www-form-urlencoded",
            }
        })

        let response = await request.json();
        let dataToStorage = JSON.stringify(response);
        sessionStorage.setItem('response', dataToStorage);
        let data = sessionStorage.getItem('response');
        generateData(JSON.parse(data)); 
    }catch(error){
        console.log(error);
    }    
}

function generateData(response){
    let main = document.querySelector('.question-center');
    let dobre_odpowiedzi = [];

    let sprawdz = document.createElement('div');

    sprawdz.classList.add('sprawdz');
    sprawdz.textContent = "Sprawdz Odpowiedzi";
    main.append(sprawdz)

    let element_sprawdz = document.querySelector('.sprawdz');
    if(response && response.length > 0){
        response.forEach((res, i) => {
            let text = `
                <div class="id">Pytanie: ${i+1}</div>
                <div class="img">
                    <img src="${res.obrazek}" alt="">
                </div>
                <div class="title">
                    ${res.title}
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
            element.classList.add('pytanie')
            element.innerHTML = text;
            main.insertBefore(element,element_sprawdz);

            let answers = [res.A,res.B,res.C,res.D];
            let newAnswer = [];
            answers.forEach((answer,i) => {
                newAnswer[i] = answer;
            })

            let answerEl = element.querySelectorAll('.answer');

            answerEl.forEach((answer,i) => {
                answer.textContent = newAnswer[i];
            })

            let title = element.querySelector('.title')
            dobre_odpowiedzi.push({title: title, poprawna: res.poprawna_odp});

            sprawdzanie(element,dobre_odpowiedzi)
        })
    
    }else {
        console.log("No data to generate.")
    }
}

function sprawdzanie(element,poprawne){
    //dodawanie odpowiedzi do egzaminu
    let answers = element.querySelectorAll('.answer');
    let odpowiedzi_user = [];
    let result = 0;

    answers.forEach((answer) => {
        answer.addEventListener('click' ,(e) => {
            let currentAnswer = e.currentTarget;
            answers.forEach(a => {
                a.classList.remove('odp')
            })
            currentAnswer.classList.add('odp');
            dodajOdpowiedziUzytkownikaDoTablicy();
        })
    })
    //sprawdanie odpowiedzi

    const dodajOdpowiedziUzytkownikaDoTablicy = () => {
        let odpowiedzi = document.querySelectorAll('.odp');

        odpowiedzi.forEach((odp, i) => {
            let currentElement = odp.parentElement.parentElement.parentElement;
            let titleOdp = currentElement.querySelector('.title');
            odpowiedzi_user[i] = {odp: odp}
            //console.log(odpowiedzi_user)
        })
    }

    const sprawdzCzyOdpowiedziUzytkownikaPoprawne = (user_odp, poprawne) => {
        for(let i = 0; i < poprawne.length; i++){
            let odpElement = user_odp[i].odp;
            let odpText = odpElement.textContent;
            
            let poprawnaOdp = poprawne[i]
            let poprawnaOdpText = poprawnaOdp.poprawna;

            if(odpText == poprawnaOdpText){
                odpElement.classList.add('odpgood');
                result++;
            }else{
                odpElement.classList.add('odpbad');

                let answersElement = odpElement.parentElement;
                let otherAnswers = [...answersElement.querySelectorAll('.answer')];
                otherAnswers.forEach(answer => {
                    if(answer.textContent == poprawnaOdpText){
                        answer.classList.add('active');
                    }
                })
            }
        }   
        let wynik = (result/parseInt(poprawne.length) * 100).toFixed(1);
        pokazWynik(result,poprawne.length,wynik)
    }

    const pokazWynik = (result,wszystkie_odp,wynik) => {
        let resultElement = document.querySelector('.result')
        let resultTitle = document.querySelector('.result-title')
        let resultWynik = document.querySelector('.wynik')
        let resultProcent = document.querySelector('.procent')

        if(wynik >= 50){    
            resultElement.classList.remove('niezdany')
            resultElement.classList.add('zdany');
            resultTitle.textContent = `Gratulacje zdałeś egzamin`;
        }else{
            resultElement.classList.remove('zdany');
            resultElement.classList.add('niezdany')
            resultTitle.textContent = `Gratulacje NIE zdałeś egzaminu`;
        }

        resultWynik.textContent = `[${result}/${wszystkie_odp}]`;
        resultProcent.textContent = `${wynik}%`;
    }

    let sprawdz = document.querySelector('.sprawdz');
    sprawdz.addEventListener('click', () => {
        sprawdzCzyOdpowiedziUzytkownikaPoprawne(odpowiedzi_user,poprawne)
        sprawdz.classList.add('schowaj')
    })
}