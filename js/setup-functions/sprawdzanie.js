import { sprawdzCzyOdpowiedziUzytkownikaPoprawne } from "./sprawdzCzyOdpowiedziUzytkownikaPoprawne.js";
import { dodajOdpowiedziUzytkownikaDoTablicy } from "./dodajOdpowiedziUzytkownikaDoTablicy.js";
import { checkIdIsValid } from "../sprawdzanie/checkIdIsValid.js";

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
