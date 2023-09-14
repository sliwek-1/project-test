const secretKey = "#$HaLaBaRdAtOBrOnSReDnOwIeCzA1410";
const iv = CryptoJS.lib.WordArray.random(16);

window.addEventListener('DOMContentLoaded', () => {
    let btnsE = document.querySelectorAll('.list-item');
    let data = sessionStorage.getItem('response');

    

    if(data !== null){
        generateData(JSON.parse(deszyfrowanieDanych(data)));
    }else{
        console.log("e")
    }

    
    btnsE.forEach(btn => {
        btn.addEventListener('click', (e) => {
            let currentElement = e.currentTarget;
            let id = currentElement.dataset.id;
            clear(id)
            sendData(id);
        })
    })

    let odpowiedzi = sessionStorage.getItem('odpowiedzi_user');
    let poprawne = sessionStorage.getItem('poprawne');

    if (odpowiedzi !== null && poprawne !== null) {
        loadDataFromStorage(JSON.parse(odpowiedzi), JSON.parse(poprawne));
    }
})

function losujPonownie(){
    let losuj = document.querySelector('.losuj');
    losuj.addEventListener('click', () => {
        let id = sessionStorage.getItem('exam-id');
        console.log("click")
        clear(id)
        sendData(id) 
    })
}

function clear(id){
    let main = document.querySelector('.question-center');
    let btnCenter = document.querySelector('.btn-center');
    let resultTitle = document.querySelector('.result-title')
    let resultWynik = document.querySelector('.wynik')
    let resultProcent = document.querySelector('.procent')
    resultTitle.textContent = "";
    resultProcent.textContent = "";
    resultWynik.textContent = "";
    main.innerHTML = "";
    btnCenter.innerHTML = "";
    sessionStorage.setItem('exam-id', id);
    sessionStorage.removeItem('response');
    sessionStorage.removeItem('odpowiedzi_user');
    sessionStorage.removeItem('poprawne');
    sessionStorage.removeItem('results');
}


// funkcja pobiera dane z sessionStorage przeglądargi gdy są dostępne a następnie je wyświetla
// co poswala widzieć dobre i złe odpowiedzi udzielone podczas testu po odświeżeniu strony
function loadDataFromStorage(odpowiedzi, poprawne){
    let answers = document.querySelectorAll('.pytanie');
    let dataResult = sessionStorage.getItem('results');
    let data = JSON.parse(dataResult);
    let dobreOdpowiedzi = data.odp_dobrze;
    let wszystkie = data.wszystkie_odp;
    let wynikProcentowy = data.wynik;
    
    answers.forEach((answer, i) => {
        let odpowiedziUser = odpowiedzi[i].odp;
        let odpowiedziEl = answer.querySelectorAll('.answer');
        let poprawneOdp = poprawne[i].poprawna;

        odpowiedziEl.forEach(odp => {
                if(odp.textContent == odpowiedziUser){
                    odp.classList.add('odp');
                    let odpowiedz = answer.querySelector('.odp');
                    if(poprawneOdp == odpowiedz.textContent){
                        odpowiedz.classList.add('odpgood');
                       // console.log("true")
                    }else{
                        odpowiedz.classList.add('odpbad');
                        let answersElement = odpowiedz.parentElement;
                        let otherAnswers = [...answersElement.querySelectorAll('.answer')];
                        otherAnswers.forEach(answer => {
                            if(answer.textContent == poprawne[i].poprawna){
                                answer.classList.add('active');
                            }
                        })
                       // console.log("false")
                    }
                }
        })
    })
    pokazWynik(dobreOdpowiedzi,wszystkie,wynikProcentowy)
    
    let sprawdz = document.querySelector('.sprawdz');
    sprawdz.classList.add('schowaj');
}

// funkcja wywołuje funlcje fetchData z odpowiedznimi parametrami do każdego egzaminu
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

// fetch data wysyła dane z parametrami do odpowiedniego pliku php aby uzyskać pytania
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
        let zaszyfrowaneDane = szyfrowanieDanych(dataToStorage)
        sessionStorage.setItem('response', zaszyfrowaneDane);
        let data = sessionStorage.getItem('response');
        generateData(JSON.parse(deszyfrowanieDanych(data)),dbID); 
    }catch(error){
        console.log(error);
    }    
}

function szyfrowanieDanych(data){
    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      secretKey,
      { iv }
    ).toString();
        
    deszyfrowanieDanych(encryptedData)

    return encryptedData
}

function deszyfrowanieDanych(encryptedData){
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, secretKey, { iv });
    const decryptedData = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));

    return decryptedData
}

// funkcja generuje wszystkie pytania
function generateData(response,id){
    let main = document.querySelector('.question-center');
    let btnCenter = document.querySelector('.btn-center');
    let dobre_odpowiedzi = [];
    let elements = [];
    let examID = document.querySelector('.exam-id');
    let sprawdz = document.createElement('div');

    examID.value = id

    sprawdz.classList.add('sprawdz');
    sprawdz.textContent = "Sprawdz Odpowiedzi";
    btnCenter.append(sprawdz)

    let losuj = document.createElement('div');

    losuj.classList.add('losuj');
    losuj.textContent = "Losuj Dalej";
    btnCenter.append(losuj)

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
            main.append(element);

            let answers = [res.A,res.B,res.C,res.D];
            let answerEl = element.querySelectorAll('.answer');

            answerEl.forEach((answer,i) => {
                answer.textContent = answers[i];
            })

            dobre_odpowiedzi.push({poprawna: res.poprawna_odp});
            elements.push(element)
        })    
        sprawdzanie(elements,dobre_odpowiedzi)
        losujPonownie();
    }else {
        console.log("No data to generate.")
    }
}


// funkcja dodaje klase odp do każdej odpowiedzi uzytkownika dzięki temu zliczane są poprawne odpowiedzi
// funkcja zawiera również definicję logiki przycisku sprawdz który wywołuje funkcję zliczającą punkty 
// po kliknięci na tej samej zasadze co funkcja loadDataFromStorage
function sprawdzanie(element,poprawne){
    //dodawanie odpowiedzi do egzaminu
    element.forEach(el => {
        let answers = el.querySelectorAll('.answer');

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
    })


    // sprawdanie odpowiedzi
    let sprawdz = document.querySelector('.sprawdz');
    sprawdz.addEventListener('click', () => {
        let odpowiedzi = sessionStorage.getItem('odpowiedzi_user');
        let odpowiedzi_user = JSON.parse(odpowiedzi) 
        sessionStorage.setItem('poprawne',JSON.stringify(poprawne));
        sprawdzCzyOdpowiedziUzytkownikaPoprawne(odpowiedzi_user,poprawne)
        sprawdz.classList.add('schowaj')
        scrollTo(0,window.screenY)
    })
}

// funkcja zlicza poprawne odpowiedzi gdzy odpowiedz użydkownika do komkretnego pytania jest zgodna z poprawną
// nadaje odpowiednie klasy dla dobrej oraz złej odpowiedzi ponadto zlicza procentowy wynik oraz przekazuje te parametry do funkcji wyświetlającej wynik
function sprawdzCzyOdpowiedziUzytkownikaPoprawne(user_odp, poprawne){
    let result = 0;
    let answers = document.querySelectorAll('.odp');
    let examID = document.querySelector('.exam-id').value;

    let id = examID.slice(0,5);

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
    })    

    let wynik = (result/parseInt(poprawne.length) * 100).toFixed(1);
    pokazWynik(result,poprawne.length,wynik);
    if(poprawne.length == 40){
        sendExamData(wynik,id);
    }
}

async function sendExamData(wynik, id){
    try{
        let data = new Date().toDateString();
        let formData = new FormData();
        formData.append("date",data);
        formData.append("wynik",wynik);
        formData.append("exam-id",id);

        let request = await fetch('php/storageExam.php',{
            method: 'post',
            body: formData
        })

        let response = await request.text()

        // console.log(response)
    }catch(error){
        console.log(error)
    }
}
 
// dodaje odpowiedzi użytkownika z klasą odp do tablicy
function dodajOdpowiedziUzytkownikaDoTablicy(){
    let odpowiedzi_user = [];
    let odpowiedzi = document.querySelectorAll('.odp');

    odpowiedzi.forEach((odp) => {
        let index = Array.from(odpowiedzi).indexOf(odp);
        odpowiedzi_user[index] = {odp: odp.textContent}
    })

    sessionStorage.setItem('odpowiedzi_user', JSON.stringify(odpowiedzi_user));
}


// funckja wyswietla element z wynikiem testu
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

    sessionStorage.setItem('results', JSON.stringify({odp_dobrze: result, wszystkie_odp: wszystkie_odp,wynik: wynik}));
}
