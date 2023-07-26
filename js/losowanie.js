let result = 0;
window.addEventListener('DOMContentLoaded', () => {
    let btnsE = document.querySelectorAll('.list-item');
    let main = document.querySelector('.question-center');
    let data = sessionStorage.getItem('response');
    let odpowiedzi = sessionStorage.getItem('odpowiedzi_user');
    let poprawne = sessionStorage.getItem('poprawne');

    if(odpowiedzi !== null && poprawne !== null){
        sprawdzCzyOdpowiedziUzytkownikaPoprawne(JSON.parse(odpowiedzi), JSON.parse(poprawne))
    }else{
        console.log("error");
    }
    
    if(data !== null){
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
            sessionStorage.removeItem('odpowiedzi_user');
            sessionStorage.removeItem('poprawne');
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
            let answerEl = element.querySelectorAll('.answer');

            answerEl.forEach((answer,i) => {
                answer.textContent = answers[i];
            })

            dobre_odpowiedzi.push({poprawna: res.poprawna_odp});

            sprawdzanie(element,dobre_odpowiedzi)
        })
        sessionStorage.setItem('poprawne',JSON.stringify(dobre_odpowiedzi));
    
    }else {
        console.log("No data to generate.")
    }
}

function sprawdzanie(element,poprawne){
    //dodawanie odpowiedzi do egzaminu
    let answers = element.querySelectorAll('.answer');

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

    let sprawdz = document.querySelector('.sprawdz');
    sprawdz.addEventListener('click', () => {
        let odpowiedzi = sessionStorage.getItem('odpowiedzi_user');
        let odpowiedzi_user = JSON.parse(odpowiedzi) 
        
        sprawdzCzyOdpowiedziUzytkownikaPoprawne(odpowiedzi_user,poprawne)
        sprawdz.classList.add('schowaj')
        scrollTo(0,window.screenY)
    })
}

function sprawdzCzyOdpowiedziUzytkownikaPoprawne(user_odp, poprawne){
    let answers = document.querySelectorAll('.odp');
    
    answers.forEach((answer,i) => {
        
        if(answer.textContent == user_odp[i].odp){
            if(poprawne[i].poprawna == user_odp[i].odp){
                answer.classList.add('odpgood');
                result++;
            }else{
                answer.classList.add('odpbad');
                let answersElement = answer.parentElement;
                let otherAnswers = [...answersElement.querySelectorAll('.answer')];
                otherAnswers.forEach(answer => {
                    if(answer.textContent == poprawne[i].poprawna){
                        answer.classList.add('active');
                    }
                })
            }
        }
    
        //console.log(answer.textContent)
    })    

    let wynik = (result/parseInt(poprawne.length) * 100).toFixed(1);
    pokazWynik(result,poprawne.length,wynik)
}

function dodajOdpowiedziUzytkownikaDoTablicy(){
    let odpowiedzi_user = [];
    let odpowiedzi = document.querySelectorAll('.odp');

    odpowiedzi.forEach((odp) => {
        let index = Array.from(odpowiedzi).indexOf(odp);
        odpowiedzi_user[index] = {odp: odp.textContent}
    })

    sessionStorage.setItem('odpowiedzi_user', JSON.stringify(odpowiedzi_user));
}

function pokazWynik(result,wszystkie_odp,wynik){
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