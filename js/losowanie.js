import { anticheat } from "./anticheat.js";
import { checkWithModeIsOn } from "./gamemode/choose-gamemode.js";
import { checkIdIsValid } from "./sprawdzanie/checkIdIsValid.js";

const secretKey = "#$HaLaBaRdAtOBrOnSReDnOwIeCzA1410";
const iv = CryptoJS.lib.WordArray.random(16);
let odpowiedzi_user = new Array(40).fill({odp: "Brak odpowiedzi", id: "Brak ID"});

window.addEventListener('DOMContentLoaded', () => {
    let btnsE = document.querySelectorAll('.list-item');
    let data = sessionStorage.getItem('response');

    if(data !== null){
        checkWithModeIsOn(JSON.parse(deszyfrowanieDanych(data)));
    }else{
        //console.log("e")
    }

    btnsE.forEach(btn => {
        btn.addEventListener('click',async (e) => {
            initial(e)
        })
    })

    let odpowiedzi = sessionStorage.getItem('odpowiedzi_user');
    let poprawne = sessionStorage.getItem('poprawne');

    let userActions = sessionStorage.getItem('userActions');
    if(userActions !== null || userActions !== undefined){
        anticheat();
    }

    if (odpowiedzi !== null && poprawne !== null) {
        loadDataFromStorage(JSON.parse(odpowiedzi), JSON.parse(poprawne));
    }
})

function initial(e){
    let currentElement = e.currentTarget;
    let id = currentElement.dataset.id;
    sessionStorage.setItem('examSaveStatus', false)
    clear(id)
    sendData(id);
    setStartedData();
    anticheat();
}

// ustawia date rozpoczęcia egzaminu
function setStartedData(){
    sessionStorage.removeItem('startedExamData')
    let data = new Date().getTime();
    sessionStorage.setItem('startedExamData', data);
}

export function losujPonownie(){
    let losuj = document.querySelector('.losuj');
    losuj.addEventListener('click', () => {
        let id = sessionStorage.getItem('exam-id');
        clear(id)
        sendData(id) 
    })
}

function clear(id){
    let main = document.querySelector('.question-center');
    let btnCenter = document.querySelector('.btn-center');
    let resultTitle = document.querySelector('.result-title')
    let resultWynik = document.querySelector('.wynik')
    let userActionsElement = document.querySelector('.userActions').textContent = "";
    let resultProcent = document.querySelector('.procent');
    let navQuestions = document.querySelector('.nav-questions');

    odpowiedzi_user = new Array(40).fill({odp: "Brak odpowiedzi", id: "Brak ID"});;
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
    sessionStorage.removeItem('userActions');
    navQuestions.innerHTML = "";
}

// funkcja pobiera dane z sessionStorage przeglądargi gdy są dostępne a następnie je wyświetla
// co poswala widzieć dobre i złe odpowiedzi udzielone podczas testu po odświeżeniu strony
function loadDataFromStorage(odpowiedzi, poprawne){
    let dataResult = sessionStorage.getItem('results');
    let data = JSON.parse(dataResult);
    let dobreOdpowiedzi = data.odp_dobrze;
    let wszystkie = data.wszystkie_odp;
    let wynikProcentowy = data.wynik;
    
    colorAnswersAfterChecking(odpowiedzi, poprawne);
    checkIdIsValid();
    pokazWynik(dobreOdpowiedzi,wszystkie,wynikProcentowy)
    
    let sprawdz = document.querySelector('.sprawdz');
    sprawdz.classList.add('schowaj');
}


function colorAnswersAfterChecking(odpowiedzi, poprawne) {
    let answers = document.querySelectorAll('.answers-list');
    console.log(answers)
    answers.forEach((answer, i) => {
        let odpowiedziUser = odpowiedzi[i];
        let odpowiedziEl = answer.querySelectorAll('.answer');
        let poprawneOdp = poprawne[i].poprawna;

        odpowiedziEl.forEach(odp => {
                if(odp.textContent == odpowiedziUser?.odp){
                    odp.classList.add('odp');
                    let odpowiedz = answer.querySelector('.odp');
                    if(poprawneOdp == odpowiedz.textContent){
                        odpowiedz.classList.add('odpgood');
                    }else{
                        odpowiedz.classList.add('odpbad');
                        let answersElement = odpowiedz.parentElement;
                        let otherAnswers = [...answersElement.querySelectorAll('.answer')];
                        otherAnswers.forEach(answer => {
                            if(answer.textContent == poprawne[i].poprawna){
                                answer.classList.add('active');
                            }
                        })
                       
                    }
                }

                if(odpowiedziUser?.odp == "Brak odpowiedzi"){
                   if(odp.textContent == poprawneOdp){
                        odp.style.background = 'royalblue';
                   }
                }
        })
    })
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
        checkWithModeIsOn(JSON.parse(deszyfrowanieDanych(data)),dbID); 
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

// funkcja dodaje klase odp do każdej odpowiedzi uzytkownika dzięki temu zliczane są poprawne odpowiedzi
// funkcja zawiera również definicję logiki przycisku sprawdz który wywołuje funkcję zliczającą punkty 
// po kliknięci na tej samej zasadze co funkcja loadDataFromStorage
export function sprawdzanie(element,poprawne){
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
                dodajOdpowiedziUzytkownikaDoTablicy(e);
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
        checkIdIsValid();
        sprawdz.classList.add('schowaj')
        scrollTo(0,window.screenY)
    })
}


 
// dodaje odpowiedzi użytkownika z klasą odp do tablicy
function dodajOdpowiedziUzytkownikaDoTablicy(e){
    let currentOdp = e.target;
    let IdElement = currentOdp.parentElement.parentElement.parentElement;
    let id = IdElement.querySelector('.id').textContent;
    odpowiedzi_user[id] = {odp: currentOdp.textContent, id: id};
    sessionStorage.setItem('odpowiedzi_user', JSON.stringify(odpowiedzi_user));
}
